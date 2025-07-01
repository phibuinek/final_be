import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

// Validator cho số điện thoại Việt Nam
export function IsVietnamesePhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isVietnamesePhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'string' && 
            /^(0|\+84)([1-9][0-9]{8}|[1-9][0-9]{7})$/.test(value.replace(/\s/g, ''));
        },
        defaultMessage(args: ValidationArguments) {
          return 'Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam hợp lệ (VD: 0912345678 hoặc +84912345678)';
        }
      }
    });
  };
}

// Validator cho mối quan hệ
export function IsValidRelationship(validationOptions?: ValidationOptions) {
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

  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidRelationship',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'string' && validRelationships.includes(value.toLowerCase());
        },
        defaultMessage(args: ValidationArguments) {
          return `Mối quan hệ phải là một trong các giá trị sau: ${validRelationships.join(', ')}`;
        }
      }
    });
  };
}

// Validator cho họ tên tiếng Việt
export function IsVietnameseName(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isVietnameseName',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;
          // Cho phép chữ cái, dấu cách và dấu tiếng Việt
          const regex = /^[a-zA-ZÀ-ỹ\s]{2,100}$/;
          return regex.test(value) && value.trim().length >= 2;
        },
        defaultMessage(args: ValidationArguments) {
          return 'Họ tên phải là chữ cái tiếng Việt, độ dài từ 2-100 ký tự';
        }
      }
    });
  };
}

// Validator cho ghi chú
export function IsValidNote(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidNote',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;
          // Kiểm tra độ dài và ký tự đặc biệt
          return value.length <= 1000 && !/[<>{}]/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'Ghi chú không được chứa ký tự đặc biệt và không được vượt quá 1000 ký tự';
        }
      }
    });
  };
}

// Validator cho mảng ID
export function IsArrayOfMongoIds(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isArrayOfMongoIds',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!Array.isArray(value)) return false;
          return value.every(id => /^[0-9a-fA-F]{24}$/.test(id));
        },
        defaultMessage(args: ValidationArguments) {
          return 'Danh sách ID không hợp lệ. Mỗi ID phải là một MongoDB ObjectId hợp lệ';
        }
      }
    });
  };
} 