import fs from "fs";
import path from "path";

export interface TelemetryStore {
  totalViews: number;
  uniqueVisitors: number;
  totalClicks: number;
  visitors: Record<string, number>; // visitorId -> timestamp
  lastUpdated: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "telemetry.json");
const FALLBACK_FILE = path.join("/tmp", "mahaktech-telemetry.json");

function getStorageFilePath(): string {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    // Test write access
    fs.accessSync(DATA_DIR, fs.constants.W_OK);
    return DATA_FILE;
  } catch {
    return FALLBACK_FILE;
  }
}

// In-memory cache for fast reads and atomic increments
let cachedStore: TelemetryStore | null = null;
let writeQueue: Promise<void> = Promise.resolve();

function loadStoreFromFile(): TelemetryStore {
  const filePath = getStorageFilePath();
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(raw);
      return {
        totalViews: typeof parsed.totalViews === "number" ? parsed.totalViews : 0,
        uniqueVisitors: typeof parsed.uniqueVisitors === "number" ? parsed.uniqueVisitors : 0,
        totalClicks: typeof parsed.totalClicks === "number" ? parsed.totalClicks : 0,
        visitors: parsed.visitors && typeof parsed.visitors === "object" ? parsed.visitors : {},
        lastUpdated: parsed.lastUpdated || new Date().toISOString(),
      };
    }
  } catch (err) {
    console.error("Failed to read telemetry file, initializing fresh store:", err);
  }

  // Initial real count starting from 0 (actual counts, not fake)
  return {
    totalViews: 0,
    uniqueVisitors: 0,
    totalClicks: 0,
    visitors: {},
    lastUpdated: new Date().toISOString(),
  };
}

function persistStore(store: TelemetryStore): Promise<void> {
  const filePath = getStorageFilePath();
  writeQueue = writeQueue.then(async () => {
    try {
      const serialized = JSON.stringify(store, null, 2);
      fs.writeFileSync(filePath, serialized, "utf-8");
    } catch (err) {
      console.error("Failed to persist telemetry store to file:", err);
    }
  });
  return writeQueue;
}

export async function getTelemetryData(): Promise<TelemetryStore> {
  if (!cachedStore) {
    cachedStore = loadStoreFromFile();
  }
  return cachedStore;
}

export async function recordPageView(visitorId?: string): Promise<TelemetryStore> {
  if (!cachedStore) {
    cachedStore = loadStoreFromFile();
  }

  cachedStore.totalViews += 1;

  if (visitorId) {
    const isNew = !cachedStore.visitors[visitorId];
    if (isNew) {
      cachedStore.uniqueVisitors += 1;
    }
    // Keep record of last seen, pruning if over 20,000 visitors
    cachedStore.visitors[visitorId] = Date.now();
    const visitorKeys = Object.keys(cachedStore.visitors);
    if (visitorKeys.length > 20000) {
      // Keep newest 10,000
      const sorted = visitorKeys.sort((a, b) => cachedStore!.visitors[b] - cachedStore!.visitors[a]);
      const pruned: Record<string, number> = {};
      for (let i = 0; i < 10000; i++) {
        pruned[sorted[i]] = cachedStore.visitors[sorted[i]];
      }
      cachedStore.visitors = pruned;
    }
  } else {
    cachedStore.uniqueVisitors += 1;
  }

  cachedStore.lastUpdated = new Date().toISOString();
  await persistStore(cachedStore);
  return cachedStore;
}

export async function recordUserClicks(clicksCount: number = 1): Promise<TelemetryStore> {
  if (!cachedStore) {
    cachedStore = loadStoreFromFile();
  }

  const validCount = Math.max(1, Math.min(clicksCount, 1000)); // Guard against invalid payload
  cachedStore.totalClicks += validCount;
  cachedStore.lastUpdated = new Date().toISOString();

  await persistStore(cachedStore);
  return cachedStore;
}
