# NHMS Database Migration Plan

## Overview
This document outlines the migration from the current simple NestJS schema to the comprehensive NHMS database schema with enhanced features.

## Current vs Enhanced Schema Comparison

### 🔄 **Schema Modifications Required**

#### 1. User Schema Enhancement
**Current**: Basic user with roles array
```typescript
roles: Role[] // ['admin', 'staff', 'family_member']
```

**Enhanced**: Single role with role-specific fields
```typescript
role: string // 'admin' | 'staff' | 'family'
// Role-specific fields:
// Admin: is_super_admin
// Staff: position, qualification, join_date
// Family: relationship, residents[], address
```

#### 2. Resident Schema Enhancement
**Current**: Basic resident information
```typescript
fullName: string
dateOfBirth: Date
gender: string
// ... basic fields
```

**Enhanced**: Comprehensive resident management
```typescript
full_name: string
date_of_birth: Date
gender: string
admission_date: Date
discharge_date?: Date
family_member_id: ObjectId
medical_history: string
current_medications: MedicationRecord[]
allergies: string[]
emergency_contact: ContactInfo
care_level: 'basic' | 'intermediate' | 'intensive'
status: 'active' | 'discharged' | 'deceased'
```

#### 3. Care Plan System Redesign
**Current**: Embedded care plans in resident
```typescript
carePlans: CarePlan[] // Embedded in resident
```

**Enhanced**: Service package system
```typescript
// New Collections:
care_plans: ServicePackage[] // Master service packages
care_plan_assignments: Assignment[] // Service registrations
room_pricing: PricingTier[] // Room costs by type and care plan
```

### 🏗️ **New Collections to Implement**

#### Core Business Collections
1. **care_plans** - Service packages (main + supplementary)
2. **care_plan_assignments** - Service registrations with billing
3. **bed_assignments** - Bed occupancy tracking
4. **room_pricing** - Room costs by care plan and room type

#### Medical & Operations Collections
5. **medications** - Master medication database
6. **medication_administrations** - Tracking actual medication delivery
7. **vital_signs** - Medical monitoring
8. **assessments** - Medical evaluations
9. **incidents** - Safety incident reporting

#### Activity & Communication Collections
10. **activities** - Scheduled activities
11. **activity_participations** - Resident participation tracking
12. **messages** - Staff-family communication
13. **resident_photos** - Photo management with metadata

#### Administrative Collections
14. **schedules** & **shifts** - Staff scheduling
15. **inventory** - Supply management
16. **billings** - Financial tracking

### 🚀 **Migration Strategy**

#### Phase 1: Core Schema Updates
1. Update User schema to support role-specific fields
2. Enhance Resident schema with medical fields
3. Create new care plan service package system
4. Implement bed assignment tracking

#### Phase 2: Medical & Safety Features
1. Add medication management system
2. Implement vital signs tracking
3. Create assessment system
4. Add incident reporting

#### Phase 3: Business Operations
1. Implement billing system
2. Add inventory management
3. Create staff scheduling
4. Implement photo management

#### Phase 4: Communication & Analytics
1. Add messaging system
2. Implement activity tracking
3. Create reporting dashboard
4. Add analytics features

### 📊 **Service Package Business Model**

The enhanced schema implements a **service package model** where:

#### Main Care Packages (Monthly)
- **Standard Care** (6M VND): Basic elderly care
- **Active Care** (9M VND): Enhanced medical monitoring
- **Special Care** (12M VND): Complex health conditions
- **Dementia Care** (10M VND): Specialized dementia support

#### Supplementary Services (Add-ons)
- **Nutrition Support** (1.5M VND): Tube feeding assistance
- **Wound Care** (2M VND): Professional wound management
- **Physical Therapy** (2.5M VND): Rehabilitation services
- **Diabetes Care** (1.5M VND): Specialized diabetes monitoring

#### Room Pricing Tiers
- **2-bed rooms**: Premium pricing
- **3-bed rooms**: Mid-tier pricing
- **4-5 bed rooms**: Standard pricing
- **6-8 bed rooms**: Budget pricing

### 🔧 **Implementation Steps**

#### Step 1: Schema Migration Scripts
```bash
# 1. Backup current database
mongodump --db current_nhms_db

# 2. Run migration scripts to transform data
node migrate-users.js
node migrate-residents.js
node migrate-care-plans.js

# 3. Populate new collections
node populate-care-packages.js
node populate-room-pricing.js
```

#### Step 2: NestJS Module Updates
1. Update existing modules (users, residents, rooms, beds)
2. Create new modules (care-plans, billing, medications, incidents)
3. Implement role-based guards for new permissions
4. Update DTOs for enhanced validation

#### Step 3: API Endpoint Updates
1. Modify existing endpoints for enhanced schemas
2. Create new endpoint groups for business operations
3. Update Swagger documentation
4. Implement proper error handling

#### Step 4: Testing & Validation
1. Update unit tests for schema changes
2. Create integration tests for new workflows
3. Test role-based access control
4. Validate business logic (billing, assignments)

### 📈 **Business Benefits**

#### For Nursing Home Operations
- **Revenue Management**: Clear service packages with pricing
- **Bed Optimization**: Track occupancy and assignments
- **Medical Compliance**: Proper medication and incident tracking
- **Family Communication**: Transparent communication channels

#### For Development Team
- **Scalable Architecture**: Professional database design
- **Clear Business Logic**: Service-oriented approach
- **Comprehensive Features**: Production-ready functionality
- **Maintainable Code**: Well-structured schemas and relationships

### ⚠️ **Migration Considerations**

#### Data Migration Challenges
1. **Role Transformation**: Convert roles array to single role with properties
2. **Care Plan Migration**: Transform embedded plans to service assignments
3. **Medication Data**: Restructure to master + administration model
4. **Bed Assignments**: Extract bed references to separate collection

#### Backward Compatibility
1. Maintain API compatibility during transition
2. Support both old and new authentication methods
3. Gradual feature rollout to minimize disruption
4. Comprehensive testing of data transformations

### 🎯 **Next Steps**

1. **Review and Approve**: Stakeholder review of enhanced schema
2. **Create Migration Scripts**: Develop data transformation scripts
3. **Update NestJS Modules**: Implement new schemas and services
4. **Testing Phase**: Comprehensive testing of new features
5. **Production Deployment**: Gradual rollout with monitoring

This migration will transform your nursing home management system from a basic prototype to a **production-ready, comprehensive healthcare management platform**. 