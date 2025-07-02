# 👩‍⚕️ Staff Workflow Implementation Guide

## 🎯 Overview
Đây là hướng dẫn chi tiết về luồng công việc của Staff trong hệ thống NHMS, dựa trên database schema và requirements bạn đã cung cấp.

## 📋 Staff Requirements Summary

### 🔄 **Luồng chính:**
1. **Quản lý Resident**: Tạo resident, thêm family, kiểm tra sức khỏe, cân nặng, tiền sử bệnh án
2. **Chọn Care Plan & Phòng**: Assign care plan và phòng giường  
3. **Thanh toán**: QR code, mặc định thanh toán thành công, cập nhật tài khoản
4. **Chăm sóc hàng ngày**: Vital signs, assessment, activity (AI suggestions), thêm hình ảnh

## 🏗️ Implementation Status

### ✅ **Đã Implement:**
- **Enhanced User Schema**: Role-based users (admin/staff/family) với fields chuyên biệt
- **Care Plans System**: Service package model thay vì embedded care plans
- **Care Plan Assignments**: Service registration workflow với pricing
- **Resident Schema Enhancement**: Medical fields, care levels, discharge tracking
- **Vital Signs Schema**: Comprehensive health monitoring
- **Complete API Endpoints**: Staff-specific endpoints với role-based authorization

### 🔄 **API Endpoints cho Staff:**

#### **1. Care Plans Management**
```http
GET /care-plans/available
# Lấy danh sách gói dịch vụ (main + supplementary)

POST /care-plans/calculate-cost
# Tính chi phí dựa trên gói + loại phòng
Body: {
  "carePlanIds": ["plan1", "plan2"],
  "roomType": "2_bed"
}

POST /care-plans/assignments  
# Đăng ký dịch vụ cho resident
Body: {
  "residentId": "resident123",
  "familyMemberId": "family123", 
  "carePlanIds": ["plan1", "plan2"],
  "roomType": "3_bed",
  "familyPreferences": {
    "preferred_room_gender": "male",
    "preferred_floor": 2,
    "special_requests": "Gần cửa sổ"
  },
  "consultationNotes": "Bệnh nhân cần theo dõi đặc biệt",
  "additionalMedications": [...]
}

GET /care-plans/assignments
# Lấy danh sách assignments của staff

PUT /care-plans/assignments/:id/payment
# Cập nhật trạng thái thanh toán
Body: {
  "paymentStatus": "fully_paid",
  "notes": "Thanh toán qua QR code"
}
```

#### **2. Resident Management**
```http
POST /residents
# Tạo resident mới với enhanced schema
Body: {
  "full_name": "Nguyễn Văn A",
  "date_of_birth": "1950-01-01",
  "gender": "male", 
  "admission_date": "2024-01-15",
  "family_member_id": "family123",
  "medical_history": "Cao huyết áp, tiểu đường",
  "current_medications": [...],
  "allergies": ["Penicillin"],
  "emergency_contact": {
    "name": "Nguyễn Thị B",
    "phone": "0901234567", 
    "relationship": "con gái"
  },
  "care_level": "intermediate"
}

GET /residents/:id
# Lấy thông tin chi tiết resident

PUT /residents/:id
# Cập nhật thông tin resident
```

#### **3. Daily Care Activities**
```http
POST /vital-signs
# Ghi lại vital signs hàng ngày
Body: {
  "resident_id": "resident123",
  "date_time": "2024-03-01T08:00:00Z",
  "temperature": 36.5,
  "heart_rate": 75,
  "blood_pressure": "120/80",
  "weight": 65.2,
  "blood_sugar": 110,
  "notes": "Các chỉ số bình thường"
}

POST /assessments
# Ghi assessment
Body: {
  "resident_id": "resident123",
  "assessment_type": "Đánh giá tình trạng sức khỏe",
  "notes": "Tình trạng ổn định",
  "recommendations": ["Duy trì chế độ ăn", "Tập thể dục nhẹ"]
}

POST /resident-photos
# Upload hình ảnh hoạt động
Body: FormData with image + metadata
```

## 🎯 **Staff Workflow Steps**

### **Step 1: Resident Registration**
```typescript
// 1. Tạo resident với thông tin đầy đủ
const resident = await fetch('/residents', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: JSON.stringify({
    full_name: "Nguyễn Văn Nam",
    date_of_birth: "1950-05-15",
    gender: "male",
    admission_date: new Date(),
    family_member_id: familyId,
    medical_history: "Cao huyết áp, tiểu đường type 2",
    allergies: ["Penicillin"],
    emergency_contact: {
      name: "Nguyễn Thị Hoa",
      phone: "0912345678",
      relationship: "con gái"
    },
    care_level: "intermediate"
  })
});
```

### **Step 2: Service Package Selection**
```typescript
// 1. Lấy danh sách gói dịch vụ
const packages = await fetch('/care-plans/available');
// Response: { mainPackages: [...], supplementaryPackages: [...] }

// 2. Tính chi phí
const cost = await fetch('/care-plans/calculate-cost', {
  method: 'POST',
  body: JSON.stringify({
    carePlanIds: ["main_plan_id", "supplement_plan_id"],
    roomType: "3_bed"
  })
});
// Response: { carePlansCost: 10500000, roomCost: 6500000, totalCost: 17000000 }

// 3. Đăng ký dịch vụ
const assignment = await fetch('/care-plans/assignments', {
  method: 'POST',
  body: JSON.stringify({
    residentId: resident._id,
    familyMemberId: familyId,
    carePlanIds: ["main_plan_id", "supplement_plan_id"],
    roomType: "3_bed",
    consultationNotes: "Bệnh nhân cần chăm sóc đặc biệt"
  })
});
```

### **Step 3: Payment Processing**
```typescript
// Cập nhật thanh toán (mặc định thành công)
const payment = await fetch(`/care-plans/assignments/${assignmentId}/payment`, {
  method: 'PUT',
  body: JSON.stringify({
    paymentStatus: "fully_paid",
    notes: "Thanh toán thành công qua QR code"
  })
});
```

### **Step 4: Daily Care Activities**
```typescript
// 1. Ghi vital signs hàng ngày
const vitalSigns = await fetch('/vital-signs', {
  method: 'POST',
  body: JSON.stringify({
    resident_id: residentId,
    date_time: new Date(),
    temperature: 36.5,
    heart_rate: 75,
    blood_pressure: "120/80",
    weight: 65.2,
    oxygen_level: 98,
    notes: "Các chỉ số bình thường"
  })
});

// 2. Ghi assessment
const assessment = await fetch('/assessments', {
  method: 'POST', 
  body: JSON.stringify({
    resident_id: residentId,
    assessment_type: "Đánh giá hàng ngày",
    notes: "Tinh thần tốt, ăn uống bình thường",
    recommendations: ["Duy trì thuốc", "Tăng vận động"]
  })
});

// 3. Upload hình ảnh hoạt động
const formData = new FormData();
formData.append('image', imageFile);
formData.append('resident_id', residentId);
formData.append('caption', 'Hoạt động tập thể dục buổi sáng');
formData.append('activity_type', 'Hoạt động thể chất');

const photo = await fetch('/resident-photos', {
  method: 'POST',
  body: formData
});
```

## 💰 **Pricing Structure**

### **Gói Dịch Vụ Chính (Main Packages):**
- **Chăm Sóc Tiêu Chuẩn**: 6,000,000 VND/tháng
- **Chăm Sóc Tích Cực**: 9,000,000 VND/tháng  
- **Chăm Sóc Đặc Biệt**: 12,000,000 VND/tháng
- **Chăm Sóc Sa Sút Trí Tuệ**: 10,000,000 VND/tháng

### **Gói Dịch Vụ Phụ (Supplementary):**
- **Hỗ Trợ Dinh Dưỡng**: 1,500,000 VND/tháng
- **Chăm Sóc Vết Thương**: 2,000,000 VND/tháng
- **Vật Lý Trị Liệu**: 2,500,000 VND/tháng
- **Chăm Sóc Tiểu Đường**: 1,500,000 VND/tháng

### **Chi Phí Phòng:**
- **Phòng 2 giường**: 8,000,000 VND/tháng
- **Phòng 3 giường**: 6,500,000 VND/tháng
- **Phòng 4-5 giường**: 5,500,000 VND/tháng
- **Phòng 6-8 giường**: 4,500,000 VND/tháng

## 🚀 **Getting Started**

### **1. Seed Database:**
```bash
cd final_be
npm run build
node dist/database/seed-care-plans.js
```

### **2. Start Server:**
```bash
npm run start:dev
```

### **3. Test API:**
- **Swagger UI**: `http://localhost:3000/api`
- **Login as Staff**: Use seeded staff credentials
- **Test Workflow**: Follow the steps above

## 🔐 **Authentication & Authorization**

### **Role-Based Access:**
- **Staff** có thể:
  - Tạo và quản lý residents
  - Đăng ký dịch vụ (assignments)
  - Ghi vital signs và assessments
  - Upload photos
  - Xem assignments của mình

- **Admin** có thể:
  - Tất cả quyền của Staff
  - Tạo gói dịch vụ mới
  - Xem assignments của tất cả staff
  - Quản lý users và system

### **JWT Token Required:**
```http
Authorization: Bearer <jwt_token>
```

## 📊 **Database Collections Used**

1. **users** - Staff, family, admin accounts với role-specific fields
2. **residents** - Enhanced resident information với medical data
3. **care_plans** - Service packages (main + supplementary)
4. **care_plan_assignments** - Service registrations với billing
5. **vital_signs** - Daily health monitoring
6. **assessments** - Medical evaluations  
7. **resident_photos** - Activity photos với metadata
8. **rooms** & **beds** - Facility management

## 🎉 **Next Steps**

1. **Test Staff Workflow** với Swagger UI
2. **Implement Frontend** cho Staff interface
3. **Add AI Activity Suggestions** cho activities
4. **Enhanced Photo Management** với cloud storage
5. **Real-time Notifications** cho families
6. **Advanced Analytics** cho health trends

Hệ thống hiện tại đã sẵn sàng cho Staff workflow hoàn chỉnh từ đăng ký resident đến chăm sóc hàng ngày! 🚀 