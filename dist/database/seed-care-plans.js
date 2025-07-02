"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const mongoose_1 = require("@nestjs/mongoose");
const care_plan_schema_1 = require("../care-plans/schemas/care-plan.schema");
async function seedCarePlans() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const carePlanModel = app.get((0, mongoose_1.getModelToken)(care_plan_schema_1.CarePlan.name));
    await carePlanModel.deleteMany({});
    console.log('🗑️ Cleared existing care plans');
    const mainPackages = [
        {
            plan_name: "Gói Chăm Sóc Tiêu Chuẩn",
            description: "Gói chăm sóc cơ bản cho người cao tuổi có sức khỏe ổn định",
            monthly_price: 6000000,
            plan_type: "cham_soc_tieu_chuan",
            category: "main",
            services_included: [
                "Kiểm tra sức khỏe định kỳ",
                "Bác sĩ thăm khám 1 lần/tuần",
                "Hỗ trợ sinh hoạt hàng ngày",
                "Bữa ăn đầy đủ dinh dưỡng",
                "Thuốc cơ bản",
                "Hoạt động vui chơi giải trí",
                "Tư vấn sức khỏe"
            ],
            staff_ratio: "1:8",
            duration_type: "monthly",
            default_medications: [],
            prerequisites: ["Sức khỏe ổn định", "Tự chăm sóc cơ bản"],
            contraindications: [],
            is_active: true
        },
        {
            plan_name: "Gói Chăm Sóc Tích Cực",
            description: "Chăm sóc tích cực cho người cao tuổi cần hỗ trợ y tế thường xuyên",
            monthly_price: 9000000,
            plan_type: "cham_soc_tich_cuc",
            category: "main",
            services_included: [
                "Theo dõi sức khỏe thường xuyên",
                "Bác sĩ thăm khám 2 lần/tuần",
                "Điều dưỡng có mặt trong giờ hành chính",
                "Vật lý trị liệu nhóm",
                "Chế độ ăn dinh dưỡng cân bằng",
                "Thuốc cơ bản theo đơn",
                "Hoạt động giải trí hàng ngày"
            ],
            staff_ratio: "1:5",
            duration_type: "monthly",
            default_medications: [],
            prerequisites: ["Cần hỗ trợ y tế", "Bệnh mãn tính ổn định"],
            contraindications: [],
            is_active: true
        },
        {
            plan_name: "Gói Chăm Sóc Đặc Biệt",
            description: "Dành cho những người cao tuổi cần chăm sóc đặc biệt với tình trạng sức khỏe phức tạp",
            monthly_price: 12000000,
            plan_type: "cham_soc_dac_biet",
            category: "main",
            services_included: [
                "Theo dõi sức khỏe 24/7",
                "Bác sĩ chuyên khoa thăm khám hàng tuần",
                "Điều dưỡng chuyên nghiệp túc trực",
                "Vật lý trị liệu cá nhân hóa",
                "Dinh dưỡng theo chỉ định bác sĩ",
                "Thuốc và thiết bị y tế chuyên dụng",
                "Tư vấn tâm lý cá nhân"
            ],
            staff_ratio: "1:3",
            duration_type: "monthly",
            default_medications: [],
            prerequisites: ["Tình trạng sức khỏe phức tạp", "Cần theo dõi liên tục"],
            contraindications: [],
            is_active: true
        },
        {
            plan_name: "Gói Chăm Sóc Sa Sút Trí Tuệ",
            description: "Chăm sóc chuyên biệt cho người cao tuổi mắc chứng sa sút trí tuệ",
            monthly_price: 10000000,
            plan_type: "cham_soc_sa_sut_tri_tue",
            category: "main",
            services_included: [
                "Theo dõi hành vi 24/7",
                "Bác sĩ thần kinh thăm khám định kỳ",
                "Nhân viên được đào tạo chuyên biệt",
                "Liệu pháp nhận thức",
                "Môi trường an toàn, thân thiện",
                "Thuốc điều trị chuyên khoa",
                "Hỗ trợ gia đình",
                "Hoạt động kích thích trí nhớ"
            ],
            staff_ratio: "1:4",
            duration_type: "monthly",
            default_medications: [],
            prerequisites: ["Chẩn đoán sa sút trí tuệ"],
            contraindications: [],
            is_active: true
        }
    ];
    const supplementaryPackages = [
        {
            plan_name: "Dịch Vụ Hỗ Trợ Dinh Dưỡng",
            description: "Dịch vụ cho ăn qua sonde cho bệnh nhân không thể ăn bình thường",
            monthly_price: 1500000,
            plan_type: "ho_tro_dinh_duong",
            category: "supplementary",
            services_included: [
                "Cho ăn qua sonde theo lịch trình",
                "Vệ sinh và chăm sóc ống sonde",
                "Theo dõi dinh dưỡng",
                "Báo cáo tình trạng hàng ngày"
            ],
            staff_ratio: "chuyên biệt",
            duration_type: "monthly",
            default_medications: [],
            prerequisites: ["Có ống sonde", "Chỉ định của bác sĩ"],
            contraindications: ["Nhiễm trùng đường tiêu hóa"],
            is_active: true
        },
        {
            plan_name: "Chăm Sóc Vết Thương",
            description: "Chăm sóc và thay băng vết thương chuyên nghiệp",
            monthly_price: 2000000,
            plan_type: "cham_soc_vet_thuong",
            category: "supplementary",
            services_included: [
                "Thay băng vết thương hàng ngày",
                "Sát trùng và vệ sinh vết thương",
                "Theo dõi quá trình lành vết thương",
                "Báo cáo tiến triển cho bác sĩ"
            ],
            staff_ratio: "chuyên biệt",
            duration_type: "monthly",
            default_medications: [],
            prerequisites: ["Có vết thương cần chăm sóc"],
            contraindications: ["Dị ứng với thuốc bôi"],
            is_active: true
        },
        {
            plan_name: "Vật Lý Trị Liệu",
            description: "Vật lý trị liệu cá nhân hóa để phục hồi chức năng vận động",
            monthly_price: 2500000,
            plan_type: "vat_ly_tri_lieu",
            category: "supplementary",
            services_included: [
                "Đánh giá chức năng vận động",
                "Bài tập vật lý trị liệu cá nhân",
                "Massage y học",
                "Tư vấn về hoạt động hàng ngày"
            ],
            staff_ratio: "1:1 (trong session)",
            duration_type: "monthly",
            default_medications: [],
            prerequisites: ["Cần phục hồi chức năng"],
            contraindications: ["Cấm vận động"],
            is_active: true
        },
        {
            plan_name: "Chăm Sóc Bệnh Tiểu Đường",
            description: "Chăm sóc chuyên biệt cho người mắc bệnh tiểu đường",
            monthly_price: 1500000,
            plan_type: "cham_soc_tieu_duong",
            category: "supplementary",
            services_included: [
                "Theo dõi đường huyết hàng ngày",
                "Chế độ ăn kiêng chuyên biệt",
                "Giáo dục về bệnh tiểu đường",
                "Chăm sóc chân đặc biệt"
            ],
            staff_ratio: "chuyên biệt",
            duration_type: "monthly",
            default_medications: [],
            prerequisites: ["Chẩn đoán tiểu đường"],
            contraindications: [],
            is_active: true
        },
        {
            plan_name: "Phục Hồi Chức Năng",
            description: "Chương trình phục hồi chức năng sau bệnh tật hoặc chấn thương",
            monthly_price: 3000000,
            plan_type: "phuc_hoi_chuc_nang",
            category: "supplementary",
            services_included: [
                "Đánh giá khả năng vận động",
                "Lập kế hoạch phục hồi cá nhân",
                "Tập luyện vận động cơ bản",
                "Theo dõi tiến độ phục hồi"
            ],
            staff_ratio: "1:2",
            duration_type: "monthly",
            default_medications: [],
            prerequisites: ["Cần phục hồi sau bệnh/chấn thương"],
            contraindications: ["Cấm tuyệt đối vận động"],
            is_active: true
        },
        {
            plan_name: "Chăm Sóc Giảm Nhẹ",
            description: "Chăm sóc giảm nhẹ đau đớn cho bệnh nhân giai đoạn cuối",
            monthly_price: 3500000,
            plan_type: "cham_soc_giam_nhe",
            category: "supplementary",
            services_included: [
                "Giảm đau chuyên biệt",
                "Chăm sóc tâm lý",
                "Hỗ trợ gia đình",
                "Môi trường thoải mái yên bình"
            ],
            staff_ratio: "1:1",
            duration_type: "monthly",
            default_medications: [],
            prerequisites: ["Chẩn đoán giai đoạn cuối"],
            contraindications: [],
            is_active: true
        }
    ];
    const allPackages = [...mainPackages, ...supplementaryPackages];
    await carePlanModel.insertMany(allPackages);
    console.log(`✅ Inserted ${mainPackages.length} main care packages`);
    console.log(`✅ Inserted ${supplementaryPackages.length} supplementary packages`);
    console.log(`🎉 Total: ${allPackages.length} care plans seeded successfully!`);
    await app.close();
}
seedCarePlans().catch(console.error);
//# sourceMappingURL=seed-care-plans.js.map