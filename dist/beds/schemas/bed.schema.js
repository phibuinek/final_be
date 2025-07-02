"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BedSchema = exports.Bed = exports.BedStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var BedStatus;
(function (BedStatus) {
    BedStatus["AVAILABLE"] = "available";
    BedStatus["OCCUPIED"] = "occupied";
    BedStatus["MAINTENANCE"] = "maintenance";
})(BedStatus || (exports.BedStatus = BedStatus = {}));
let Bed = class Bed extends mongoose_2.Document {
    name;
    room;
    status;
    notes;
};
exports.Bed = Bed;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, trim: true }),
    __metadata("design:type", String)
], Bed.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Bed.prototype, "room", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(BedStatus),
        default: BedStatus.AVAILABLE,
    }),
    __metadata("design:type", String)
], Bed.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata("design:type", String)
], Bed.prototype, "notes", void 0);
exports.Bed = Bed = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Bed);
exports.BedSchema = mongoose_1.SchemaFactory.createForClass(Bed);
//# sourceMappingURL=bed.schema.js.map