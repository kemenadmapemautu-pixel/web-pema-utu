/**
 * Storage Backup & Restore Utilities
 * Untuk backup dan restore data localStorage
 */

export interface BackupData {
  timestamp: string;
  version: string;
  data: {
    pengurusList?: string;
    accounts?: string;
    loginUsers?: string;
    newsList?: string;
    galleryItems?: string;
    programsList?: string;
    contactMessages?: string;
    homeStats?: string;
    structureConfig?: string;
    ministries_content?: string;
  };
}

const STORAGE_KEYS = [
  'pengurusList',
  'accounts',
  'loginUsers',
  'newsList',
  'galleryItems',
  'programsList',
  'contactMessages',
  'homeStats',
  'structureConfig',
  'ministries_content'
];

/**
 * Export semua data localStorage ke JSON file
 */
export function exportAllData(): void {
  try {
    const backupData: BackupData = {
      timestamp: new Date().toISOString(),
      version: '1.0',
      data: {}
    };

    // Collect all data
    STORAGE_KEYS.forEach(key => {
      const value = localStorage.getItem(key);
      if (value) {
        backupData.data[key as keyof BackupData['data']] = value;
      }
    });

    // Create download
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pema-utu-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log('✅ Data exported successfully');
    return;
  } catch (error) {
    console.error('❌ Error exporting data:', error);
    throw error;
  }
}

/**
 * Import data dari JSON file
 */
export function importData(jsonData: BackupData): { success: boolean; error?: string } {
  try {
    if (!jsonData.data) {
      return { success: false, error: 'Invalid backup format' };
    }

    // Validate JSON structure
    if (typeof jsonData.data !== 'object') {
      return { success: false, error: 'Invalid data structure' };
    }

    // Restore data
    let restoredCount = 0;
    Object.entries(jsonData.data).forEach(([key, value]) => {
      if (value && STORAGE_KEYS.includes(key)) {
        try {
          localStorage.setItem(key, value);
          restoredCount++;
        } catch (error) {
          console.error(`Error restoring ${key}:`, error);
        }
      }
    });

    console.log(`✅ Data imported successfully (${restoredCount} items)`);
    return { success: true };
  } catch (error) {
    console.error('❌ Error importing data:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Get storage usage statistics
 */
export function getStorageStats(): {
  totalKB: number;
  items: { key: string; sizeKB: number; percentage: number }[];
  availableKB: number;
  usagePercentage: number;
} {
  let total = 0;
  const items: { key: string; sizeKB: number; percentage: number }[] = [];

  STORAGE_KEYS.forEach(key => {
    const value = localStorage.getItem(key);
    if (value) {
      const size = new Blob([value]).size;
      total += size;
      items.push({
        key,
        sizeKB: size / 1024,
        percentage: 0 // Will calculate after
      });
    }
  });

  // Calculate percentages
  items.forEach(item => {
    item.percentage = (item.sizeKB / (total / 1024)) * 100;
  });

  // Sort by size
  items.sort((a, b) => b.sizeKB - a.sizeKB);

  const totalKB = total / 1024;
  const maxStorageKB = 5 * 1024; // Assume 5MB limit
  const availableKB = maxStorageKB - totalKB;
  const usagePercentage = (totalKB / maxStorageKB) * 100;

  return {
    totalKB,
    items,
    availableKB,
    usagePercentage
  };
}

/**
 * Clear specific data type
 */
export function clearData(key: string): boolean {
  try {
    if (STORAGE_KEYS.includes(key)) {
      localStorage.removeItem(key);
      console.log(`✅ Cleared: ${key}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Error clearing ${key}:`, error);
    return false;
  }
}

/**
 * Clear all data (except admin accounts)
 */
export function clearAllExceptAdmin(): void {
  const adminAccounts = localStorage.getItem('accounts');
  
  STORAGE_KEYS.forEach(key => {
    if (key !== 'accounts') {
      localStorage.removeItem(key);
    }
  });

  if (adminAccounts) {
    localStorage.setItem('accounts', adminAccounts);
  }

  console.log('✅ All data cleared (admin accounts preserved)');
}

/**
 * Download backup file from File input
 */
export function handleFileImport(
  file: File,
  callback: (result: { success: boolean; error?: string }) => void
): void {
  const reader = new FileReader();
  
  reader.onload = (e) => {
    try {
      const content = e.target?.result as string;
      const jsonData = JSON.parse(content) as BackupData;
      const result = importData(jsonData);
      callback(result);
    } catch (error) {
      callback({ 
        success: false, 
        error: 'Invalid JSON file' 
      });
    }
  };

  reader.onerror = () => {
    callback({ 
      success: false, 
      error: 'Error reading file' 
    });
  };

  reader.readAsText(file);
}
