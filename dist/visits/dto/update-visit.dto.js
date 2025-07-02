"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVisitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_visit_dto_1 = require("./create-visit.dto");
class UpdateVisitDto extends (0, swagger_1.PartialType)(create_visit_dto_1.CreateVisitDto) {
}
exports.UpdateVisitDto = UpdateVisitDto;
//# sourceMappingURL=update-visit.dto.js.map