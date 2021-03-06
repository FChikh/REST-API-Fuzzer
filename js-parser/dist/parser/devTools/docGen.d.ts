import def = require("raml-definition-system");
export declare function def2Doc(t: def.NodeClass, refPrefix?: string): string;
export declare function hide(): string;
export declare function generateAdjust(className: string, label: string): string;
export declare function genDoc(t: def.NodeClass, covered: {
    [name: string]: boolean;
}, refPrefix?: string): string[];
export declare function genClassTable(t: def.NodeClass, includeSuperTypes: boolean, refPrefix?: string): string;
export interface IColumn<T> {
    title(): string;
    value(c: T, refPrefix: string): any;
    extraStyles(c: T): string;
    widthAsPercent(): number;
}
export interface IRow<T> {
    value(): T;
    getClassName(): string;
    getColumnValue(c: IColumn<T>, refPrefix: string): any;
    extraStyles(c: IColumn<T>): any;
}
export interface ITableDataProvider<T> {
    getColumns(): IColumn<T>[];
    getRows(): IRow<T>[];
    title(): string;
    about(refPrefix: string): string;
}
export declare class PropertyProvider implements IRow<def.Property> {
    private _clazz;
    private _property;
    constructor(_clazz: def.NodeClass, _property: def.Property);
    value(): def.Property;
    getColumnValue(c: IColumn<def.Property>, refPrefix?: string): any;
    getClassName(): string;
    extraStyles(c: IColumn<def.Property>): string;
}
export declare class NameColumn implements IColumn<def.Property> {
    extraStyles(c: def.Property): string;
    title(): string;
    value(c: def.Property): any;
    widthAsPercent: () => number;
}
export declare class DescriptionColumn implements IColumn<def.Property> {
    extraStyles(c: def.Property): string;
    title(): string;
    value(c: def.Property): any;
    widthAsPercent: () => number;
}
export declare class MarkdownDescriptionColumn extends DescriptionColumn {
    extraStyles(c: def.Property): string;
    value(c: def.Property): any;
}
export declare class RangeColumn implements IColumn<def.Property> {
    extraStyles(c: def.Property): string;
    title(): string;
    widthAsPercent: () => number;
    value(c: def.Property, refPrefix?: string): any;
}
export declare class ValueTypeColumn extends RangeColumn {
    extraStyles(c: def.Property): string;
    title(): string;
    value(c: def.Property, refPrefix?: string): any;
}
export declare class ClassDataProvider implements ITableDataProvider<def.Property> {
    private _node;
    private _includeSuper;
    constructor(_node: def.NodeClass, _includeSuper?: boolean);
    title(): string;
    about(refPrefix?: string): string;
    getColumns(): IColumn<def.Property>[];
    getRows(): PropertyProvider[];
}
export declare class ClassDataProvider2 extends ClassDataProvider {
    getColumns(): IColumn<def.Property>[];
}
export declare function generateValueTypeDocumentation(v: def.ValueType, refPrefix?: string): string;
export declare function table(d: ITableDataProvider<any>, isInRefSection?: boolean, refPrefix?: string): string;
