export declare class LocalStorage implements Storage {
    length: number;
    [key: string]: any;
    [index: number]: string;
    getItem(key: string): any;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    clear(): void;
    key(index: number): any;
}
export interface LocalStorageHelper {
    forEach(fn: (string: any) => any): void;
    has(path: string): boolean;
    set(path: string, content: any): void;
    get(path: string): any;
    remove(path: string): void;
    clear(): void;
}
export interface LocalStorageFileSystem {
    supportsFolders: boolean;
    directory(path: string): Promise<any>;
    /**
     * Persist a file to an existing folder.
     */
    save(path: string, content: string): Promise<void>;
    /**
     * Create the folders contained in a path.
     */
    createFolder(path: any): Promise<void>;
    /**
     * Loads the content of a file.
     */
    load(path: any): Promise<string>;
    /**
     * Removes a file or directory.
     */
    remove(path: any): Promise<void>;
    /**
     * Renames a file or directory
     */
    rename(source: any, destination: any): Promise<void>;
    /**
     * clean the instance
     */
    clear(): any;
}
