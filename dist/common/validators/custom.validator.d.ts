import { ValidationOptions } from 'class-validator';
export declare function IsVietnamesePhoneNumber(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
export declare function IsValidRelationship(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
export declare function IsVietnameseName(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
export declare function IsValidNote(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
export declare function IsArrayOfMongoIds(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
