"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsVietnamesePhoneNumber = IsVietnamesePhoneNumber;
exports.IsValidRelationship = IsValidRelationship;
exports.IsVietnameseName = IsVietnameseName;
exports.IsValidNote = IsValidNote;
exports.IsArrayOfMongoIds = IsArrayOfMongoIds;
const class_validator_1 = require("class-validator");
function IsVietnamesePhoneNumber(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isVietnamesePhoneNumber',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    return typeof value === 'string' &&
                        /^(0|\+84)([1-9][0-9]{8}|[1-9][0-9]{7})$/.test(value.replace(/\s/g, ''));
                },
                defaultMessage(args) {
                    return 'Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam hợp lệ (VD: 0912345678 hoặc +84912345678)';
                }
            }
        });
    };
}
function IsValidRelationship(validationOptions) {
    const validRelationships = [
        'con',
        'con_trai',
        'con_gai',
        'vo',
        'chong',
        'cha',
        'me',
        'anh',
        'chi',
        'em',
        'chau',
        'khac'
    ];
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isValidRelationship',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    return typeof value === 'string' && validRelationships.includes(value.toLowerCase());
                },
                defaultMessage(args) {
                    return `Mối quan hệ phải là một trong các giá trị sau: ${validRelationships.join(', ')}`;
                }
            }
        });
    };
}
function IsVietnameseName(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isVietnameseName',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    if (typeof value !== 'string')
                        return false;
                    const regex = /^[a-zA-ZÀ-ỹ\s]{2,100}$/;
                    return regex.test(value) && value.trim().length >= 2;
                },
                defaultMessage(args) {
                    return 'Họ tên phải là chữ cái tiếng Việt, độ dài từ 2-100 ký tự';
                }
            }
        });
    };
}
function IsValidNote(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isValidNote',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    if (typeof value !== 'string')
                        return false;
                    return value.length <= 1000 && !/[<>{}]/.test(value);
                },
                defaultMessage(args) {
                    return 'Ghi chú không được chứa ký tự đặc biệt và không được vượt quá 1000 ký tự';
                }
            }
        });
    };
}
function IsArrayOfMongoIds(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isArrayOfMongoIds',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    if (!Array.isArray(value))
                        return false;
                    return value.every(id => /^[0-9a-fA-F]{24}$/.test(id));
                },
                defaultMessage(args) {
                    return 'Danh sách ID không hợp lệ. Mỗi ID phải là một MongoDB ObjectId hợp lệ';
                }
            }
        });
    };
}
//# sourceMappingURL=custom.validator.js.map