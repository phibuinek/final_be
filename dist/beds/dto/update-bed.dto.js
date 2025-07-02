"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBedDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_bed_dto_1 = require("./create-bed.dto");
class UpdateBedDto extends (0, swagger_1.PartialType)(create_bed_dto_1.CreateBedDto) {
}
exports.UpdateBedDto = UpdateBedDto;
//# sourceMappingURL=update-bed.dto.js.map