# MediFind Product Requirements Document (PRD)

**Product:** MediFind  
**Version:** V1.0  
**Status:** Ready for Development  
**Primary Market:** Nigeria  
**Initial Pilot Market:** Ile-Ife, Osun State  
**Platforms:** Responsive Web Application — Desktop, Tablet, and Mobile  
**Primary V1 Goal:** Help users find where a specific medicine is currently available before leaving home.

---

## 1. Product Overview

MediFind is a medicine availability and pharmacy discovery platform designed to help users find nearby pharmacies that have the exact medicine they need.

The core problem MediFind solves is not simply:

> “Where is the nearest pharmacy?”

The real problem is:

> “Which nearby pharmacy currently has the exact medicine I need, how much does it cost, how many units may still be available, and how recently was that stock information confirmed?”

MediFind connects users with verified pharmacies and provides transparent medicine availability data, including:

- medicine name
- brand/manufacturer
- strength
- dosage form
- price
- estimated/confirmed quantity
- stock status
- last updated timestamp
- freshness/confidence level
- pharmacy distance
- pharmacy contact details
- reservation capability

MediFind V1 will focus on discovery, verification, reservation, prescription search, and pharmacy stock visibility.

MediFind is **not a diagnosis platform** and must not independently prescribe medicines or tell users to substitute prescription medicines without pharmacist confirmation.

---

# 2. Product Vision

To become the trusted medicine availability network that helps people quickly locate the medicines they need while giving pharmacies better visibility into real local demand.

Long term, MediFind can evolve into infrastructure connecting:

- patients
- pharmacies
- hospitals
- distributors
- pharmaceutical manufacturers
- HMOs
- NGOs
- health programs

For V1, the focus remains:

**Users + Pharmacies + MediFind Admin**

---

# 3. Product Mission

MediFind should reduce:

- unnecessary trips to multiple pharmacies
- time wasted searching for medicines
- uncertainty about medicine availability
- missed pharmacy sales
- poor visibility into local medicine demand

The product should increase:

- access to medicines
- confidence in stock information
- pharmacy discoverability
- reservation reliability
- stock transparency
- medication search convenience

---

# 4. Target Users

## 4.1 Primary User — Patient / Customer

A person who needs to find a medicine for themselves or someone else.

Their main question is:

> “Where can I get this medicine near me right now?”

### User responsibilities

The user can:

- search medicines
- choose or update location
- compare nearby pharmacies
- view prices
- view stock quantity
- view stock freshness
- view last updated timestamps
- view related medicine products
- request stock confirmation
- reserve medicines
- upload prescriptions
- review extracted prescription medicines
- view prescription pharmacy matches
- save medicines
- save pharmacies
- track reservations
- cancel reservations when allowed
- call pharmacies
- get directions
- report incorrect availability

---

## 4.2 Pharmacy Owner

The account holder responsible for a pharmacy on MediFind.

### Pharmacy Owner responsibilities

The owner can:

- register a pharmacy
- submit pharmacy verification information
- manage pharmacy profile
- manage pharmacy opening hours
- manage inventory
- update prices
- update quantities
- respond to stock requests
- receive reservation requests
- confirm or reject reservations
- view reservation history
- view stock history
- view search demand insights
- add staff
- remove staff
- manage staff permissions
- connect future inventory/POS integrations
- view pharmacy analytics

---

## 4.3 Pharmacy Staff / Pharmacist

A pharmacy team member with restricted permissions.

### Pharmacy Staff responsibilities

Can:

- update inventory
- update price
- update quantity
- mark stock status
- respond to stock confirmation requests
- confirm or reject reservations
- review prescriptions where applicable
- manage pickup status

Cannot:

- delete the pharmacy
- change pharmacy ownership
- manage billing/subscription
- assign owner privileges
- change critical business identity information without authorization

---

## 4.4 MediFind Admin

MediFind platform operations team.

### Admin responsibilities

The admin can:

- approve/reject pharmacy registrations
- verify pharmacy information
- suspend pharmacies
- manage users
- manage pharmacy accounts
- manage medicine catalogue
- review stock reports
- review suspicious listings
- review reservation disputes
- monitor platform activity
- monitor stock freshness
- view fulfillment metrics
- manage system settings
- manage reports and support issues

---

# 5. V1 Scope

V1 will include three product areas:

1. **User-facing application**
2. **Pharmacy application/dashboard**
3. **MediFind admin dashboard**

---

# 6. User-Side V1 Pages

The user side will contain **10 main pages**.

## 6.1 Landing Page

### Purpose

Explain MediFind and drive users toward medicine search, account creation, or pharmacy registration.

### Required sections

- MediFind logo/navigation
- Hero headline
- short product description
- medicine search CTA
- upload prescription CTA
- how MediFind works
- stock freshness explanation
- benefits
- trust/value section
- pharmacy CTA
- footer

### Primary CTAs

- Find Medicine
- Upload Prescription
- Log In
- Sign Up
- Register Your Pharmacy

### Responsive behavior

Desktop:
- full navigation
- horizontal hero
- wider sections

Mobile:
- condensed navigation
- stacked hero content
- touch-friendly buttons
- sections displayed vertically

---

## 6.2 Authentication Page

### Purpose

Allow users to log in or create an account.

### Authentication options

- email
- phone number
- password
- Google authentication
- forgot password
- reset password
- verification state

### Important pharmacy CTA

The authentication page must include:

> **Are you a pharmacy? Register Your Pharmacy**

This must route to the separate pharmacy registration flow.

### User authentication states

- signed out
- signed in
- loading
- invalid credentials
- verification required
- password reset requested
- password successfully reset

---

## 6.3 Home / Find Medicine Page

### Purpose

The main user search experience after authentication.

### Required elements

- greeting
- medicine search field
- location selector
- search button
- popular searches
- recent searches
- nearby pharmacies preview
- upload prescription CTA

### Search example

User searches:

`Amoxicillin 500mg`

Location:

`Ile-Ife, Osun`

---

## 6.4 Search Results Page

### Purpose

Show pharmacies that carry the searched medicine.

### Result fields

Each pharmacy listing should show:

- pharmacy name
- verified status
- distance
- opening status
- medicine price
- quantity
- stock status
- stock freshness
- last updated time
- Reserve
- View Pharmacy
- Ask Pharmacy where relevant

### Filters

- distance
- price
- availability
- last updated
- open now

### Sorting

Possible sort options:

- nearest
- lowest price
- freshest stock
- highest quantity

### Desktop layout

Recommended:

- result list
- optional map panel

### Mobile layout

Do not force list and map side-by-side.

Use:

- result list
- View Map action
- mobile filter drawer/sheet

---

# 7. Hybrid Stock Availability Model

MediFind V1 will use a **Hybrid Stock Model**.

The platform must not simply show “In Stock” without communicating how recent that information is.

## 7.1 Live

Stock is automatically synchronized through a pharmacy integration.

Display:

- LIVE
- quantity
- last sync time

Example:

> 18 packs  
> LIVE  
> Updated 6 minutes ago

---

## 7.2 Fresh

Stock was recently confirmed manually by the pharmacy.

Example:

> 25 packs  
> FRESH  
> Confirmed 24 minutes ago

---

## 7.3 Recent

Stock information is older but still reasonably recent.

Example:

> 12 packs  
> RECENT  
> Updated 5 hours ago

---

## 7.4 Old / Last Known Stock

Stock information is stale.

MediFind must stop presenting stale stock as guaranteed availability.

Example:

> Last known stock: 40 packs  
> Updated yesterday at 4:32 PM  
> Availability may have changed.

CTA:

> Ask Pharmacy

---

## 7.5 Suggested freshness logic

Initial V1 thresholds may be:

- LIVE: synchronized source
- FRESH: updated within 1 hour
- RECENT: updated within 24 hours
- OLD: older than 24 hours

These thresholds should remain configurable.

---

# 8. Related Medicines

One of MediFind’s important discovery features is the ability to show related products when the exact searched brand is unavailable.

## Example

User searches:

> Panadol 500mg

No nearby pharmacy has that exact brand.

MediFind may show:

### Exact Match

No nearby exact-brand result available.

### Related Products

- Paracetamol 500mg — Emzor
- Paracetamol 500mg — M&B

The relationship should be based on compatible structured medicine attributes such as:

- active ingredient
- strength
- dosage form

### Safety requirement

MediFind must not say:

> “Take this instead.”

The interface should say:

> Related product with the same active ingredient.

And where appropriate:

> Confirm any substitution with a pharmacist before purchase.

Prescription medicines require extra caution.

---

# 9. Medicine Details Page

### Purpose

Provide structured information about a medicine and show where it is available.

### Required information

- display name
- generic name
- brand
- manufacturer
- strength
- dosage form
- category
- prescription requirement
- medicine image where available
- related products
- nearby pharmacy availability

### Pharmacy availability section

Show:

- pharmacy
- price
- stock quantity
- stock status
- freshness
- last updated
- distance
- View Pharmacy
- Reserve

### Medical safety

MediFind should not diagnose or prescribe.

Any informational medicine content must clearly state that users should consult a healthcare professional for medical advice.

---

# 10. Pharmacy Details Page

### Purpose

Show trustworthy pharmacy information and its available medicines.

### Required data

- pharmacy name
- verification badge
- pharmacy image/logo
- address
- distance
- phone
- opening hours
- open/closed status
- map/location
- rating/reviews if implemented
- available medicines
- stock quantity
- price
- freshness
- last updated timestamp

### Actions

- Call
- Get Directions
- Reserve Medicine
- Ask for Confirmation
- Save Pharmacy

### Medicine search inside pharmacy

Users should be able to search the medicine list of a pharmacy.

---

# 11. Reservation Flow

Reservation is a **request-based workflow**.

A user clicking Reserve must not instantly see:

> Reservation successful.

Instead:

## Step 1

User selects:

- medicine
- pharmacy
- quantity

## Step 2

MediFind creates reservation request.

Status:

`PENDING_CONFIRMATION`

## Step 3

Pharmacy receives notification.

Example:

> A customer wants to reserve 2 packs of Amoxicillin 500mg.

Pharmacy actions:

- Confirm
- Reject

## Step 4 — Confirmed

If confirmed:

Status:

`CONFIRMED`

User receives notification.

Possible next status:

`READY_FOR_PICKUP`

## Step 5 — Pickup

Pharmacy/user marks pickup completed according to final implementation.

Status:

`COMPLETED`

---

## 11.1 Reservation statuses

V1 should support:

- PENDING_CONFIRMATION
- CONFIRMED
- READY_FOR_PICKUP
- REJECTED
- CANCELLED
- COMPLETED
- EXPIRED

---

## 11.2 Reservation requirements

Each reservation should contain:

- user
- pharmacy
- medicine
- quantity
- price snapshot
- request date
- response date
- status
- pickup deadline
- updated timestamp

---

# 12. Upload Prescription Page

### Purpose

Allow a user to upload a prescription instead of searching medicines one-by-one.

### Supported input

Desktop:

- drag and drop
- file picker

Mobile:

- file upload
- camera capture

Suggested supported formats:

- JPG
- PNG
- PDF

### Flow

1. Upload
2. Process
3. Review extracted medicines
4. Confirm/edit
5. Find pharmacies

---

# 13. Prescription Review

After processing, display detected medicines.

Example:

- Amoxicillin 500mg
- Metronidazole 400mg
- Paracetamol 500mg

User can:

- edit
- remove
- add another medicine
- confirm

The system must not silently trust extraction results.

User confirmation is required before searching.

---

# 14. Prescription Matches Page

### Purpose

Find the best pharmacy or pharmacy combination for the medicines in a prescription.

### V1 results can include

## Best Single Pharmacy

A pharmacy with all medicines.

Show:

- pharmacy
- distance
- individual medicines
- availability
- prices
- estimated total
- last updated data
- Reserve All

## Lowest Cost Combination

If no single pharmacy is ideal, show a combination of pharmacies.

Example:

Pharmacy A:
- medicine 1
- medicine 2

Pharmacy B:
- medicine 3
- medicine 4

Show:

- total cost
- number of pharmacies
- medicine breakdown
- distance/travel considerations where available

---

# 15. My Reservations Page

### Purpose

Allow users to track reservation requests.

### Tabs

- Active
- Ready for Pickup
- Completed
- Cancelled

### Each reservation card displays

- medicine
- pharmacy
- quantity
- status
- pickup deadline
- last updated
- View Details
- Call
- Get Directions
- Cancel where allowed
- Reorder where applicable

---

# 16. Saved Page

### Purpose

Give users quick access to items they care about.

### Tabs

- Medicines
- Pharmacies

### Saved medicines actions

- View
- Find Nearby
- Remove

### Saved pharmacies actions

- View Pharmacy
- Directions
- Remove

---

# 17. Pharmacy Registration

Pharmacy registration must be separate from normal customer signup.

### Initial information

- pharmacy name
- owner/contact name
- email
- phone
- address
- location
- operating hours
- registration/license information
- verification documents where required
- password/account setup

### Registration state

- DRAFT
- SUBMITTED
- UNDER_REVIEW
- APPROVED
- REJECTED
- SUSPENDED

Only approved pharmacies may appear as verified pharmacies.

---

# 18. Pharmacy Dashboard

### Purpose

Give pharmacies everything required to manage MediFind activity.

### Dashboard overview

Possible summary cards:

- searches near you
- reservations today
- medicines listed
- low stock
- missed demand
- pending confirmation requests

### Key sections

- Dashboard
- Inventory
- Stock Requests
- Reservations
- Search Insights
- Stock History
- Pharmacy Profile
- Staff
- Settings

---

# 19. Pharmacy Inventory

The inventory interface must allow pharmacy staff to:

- add medicine
- search medicine
- set brand
- set manufacturer
- set strength
- set form
- set quantity
- set price
- mark low stock
- mark out of stock
- update stock
- bulk update where supported

Each stock record should track:

- medicine
- pharmacy
- quantity
- price
- status
- last updated
- updated by
- update method

---

# 20. Stock Update Methods

MediFind should distinguish how a stock value was updated.

Possible values:

- MANUAL
- PHARMACIST_CONFIRMATION
- POS_INTEGRATION
- RESERVATION
- SALE
- ADMIN_CORRECTION

---

# 21. Customer Stock Requests

When stock information is old or unavailable, a user may click:

> Ask Pharmacy

Pharmacy receives:

> A customer near you is looking for Amoxicillin 500mg.

Pharmacy can answer:

- Yes
- No
- Update Stock

If Yes:

- quantity may be entered
- price may be updated
- stock timestamp refreshes

---

# 22. Search Insights for Pharmacy

Pharmacies should eventually see demand signals.

Examples:

- searches near this pharmacy
- most searched medicines
- missed demand
- searches for medicines not stocked
- popular categories
- demand trend over time

V1 analytics can remain simple.

---

# 23. MediFind Admin Dashboard

### Core areas

- Overview
- Pharmacies
- Pending Verification
- Users
- Medicines
- Reports
- Reservations
- Stock Data
- Analytics
- Settings

### Overview metrics

Examples:

- total users
- verified pharmacies
- medicines listed
- searches today
- reservations today
- fulfillment rate

---

# 24. Pharmacy Verification

Admin must be able to:

- view submitted pharmacy data
- view documents
- approve
- reject
- request correction
- suspend pharmacy

Verification status must be visible to users.

---

# 25. Medicine Catalogue

MediFind should maintain a structured medicine catalogue rather than allowing uncontrolled free-text inventory.

Suggested medicine fields:

- medicine ID
- generic name
- brand name
- manufacturer
- strength
- dosage form
- category
- active ingredient
- prescription requirement
- description
- image
- status

Pharmacies should link inventory entries to catalogue medicines where possible.

---

# 26. Core User Search Logic

Basic search flow:

1. User enters medicine query
2. System normalizes query
3. System looks for exact medicine
4. System finds nearby pharmacies
5. Results rank based on configured factors
6. System displays stock freshness
7. If exact product unavailable, system shows related products
8. User selects pharmacy
9. User may request confirmation or reserve

Possible ranking inputs:

- exact match
- availability
- freshness
- distance
- price

Final ranking algorithm can evolve after V1.

---

# 27. Notifications

V1 should support in-app notifications.

Important events:

### User notifications

- reservation submitted
- reservation confirmed
- reservation rejected
- medicine ready for pickup
- reservation cancelled
- reservation expired
- requested medicine confirmed available

### Pharmacy notifications

- new reservation
- new stock confirmation request
- reservation cancellation
- stale stock reminder
- low stock alert

Future channels may include:

- email
- SMS
- push
- WhatsApp

These are not required for first implementation unless time permits.

---

# 28. Responsive Product Requirements

MediFind V1 must work well on both desktop and mobile.

This is not a desktop-only product.

## Target widths

Desktop:

- 1440px
- 1280px
- 1024px

Tablet:

- 768px

Mobile:

- 430px
- 390px
- 360px

---

## 28.1 Mobile requirements

- no horizontal overflow
- touch-friendly controls
- readable text
- mobile navigation
- filters should use drawer/sheet where appropriate
- tables should transform into cards
- maps should not make content unusable
- reservation buttons must remain easy to access
- prescription camera upload must work cleanly
- forms must stack correctly
- modals must fit small screens
- important actions should not require precise mouse interaction

---

# 29. Design Principles

MediFind should feel:

- trustworthy
- clean
- healthcare-oriented
- modern
- accessible
- calm
- fast
- simple

Avoid:

- cluttered dashboards for normal users
- too many actions on one page
- confusing medical terminology
- exaggerated availability claims
- excessive animations
- unnecessary UI complexity

User pages should feel more like:

> Search + Maps + Reservation

rather than enterprise dashboards.

---

# 30. Suggested Frontend Navigation

## Public

- Home
- How It Works
- For Pharmacies
- About
- Help
- Log In
- Sign Up

## Logged-in User

- Find Medicine
- Upload Prescription
- My Reservations
- Saved
- Help
- Location
- Notifications
- Profile

---

# 31. Functional Requirements

## FR-001 Medicine Search

The user must be able to search for a medicine by name.

## FR-002 Location Search

The user must be able to choose or use a location.

## FR-003 Pharmacy Results

The system must show pharmacies carrying matching medicines.

## FR-004 Stock Freshness

Every stock result must display freshness/last updated information.

## FR-005 Related Medicines

The system should show related products when appropriate.

## FR-006 Reservation Request

Users must be able to request medicine reservation.

## FR-007 Pharmacy Confirmation

Pharmacies must be able to confirm or reject reservations.

## FR-008 Reservation Tracking

Users must be able to track reservation status.

## FR-009 Prescription Upload

Users must be able to upload prescription images/PDFs.

## FR-010 Prescription Review

Users must review extracted medicines before search.

## FR-011 Pharmacy Match

The system must identify pharmacies able to fulfill prescription medicines.

## FR-012 Pharmacy Registration

Pharmacies must be able to register separately.

## FR-013 Pharmacy Verification

Admin must approve a pharmacy before verified status.

## FR-014 Inventory Management

Pharmacies must be able to manage medicine stock.

## FR-015 Ask Pharmacy

Users must be able to request fresh stock confirmation.

## FR-016 Save Items

Users must be able to save medicines and pharmacies.

## FR-017 Admin Management

Admin must be able to manage pharmacies, users, medicines, reports, and stock data.

---

# 32. Non-Functional Requirements

## NFR-001 Performance

Primary pages should load quickly under normal network conditions.

## NFR-002 Responsiveness

All major functionality must be usable on desktop, tablet, and mobile.

## NFR-003 Accessibility

Use:

- semantic HTML
- keyboard navigation
- focus states
- readable contrast
- proper labels
- accessible controls

## NFR-004 Security

Protect:

- passwords
- tokens
- account data
- prescriptions
- pharmacy verification documents

## NFR-005 Privacy

Prescription files and personal user information must be handled securely and only for intended product purposes.

## NFR-006 Reliability

The product should clearly distinguish confirmed information from stale information.

## NFR-007 Maintainability

Frontend and backend should use modular architecture.

## NFR-008 Auditability

Important stock, reservation, and verification changes should record timestamps and responsible actors.

---

# 33. Core Data Entities

## User

Possible fields:

- id
- name
- email
- phone
- password hash/provider
- role
- saved medicines
- saved pharmacies
- created at
- updated at

---

## Pharmacy

Possible fields:

- id
- name
- address
- coordinates
- phone
- email
- verification status
- opening hours
- owner
- staff
- created at
- updated at

---

## Medicine

Possible fields:

- id
- generic name
- brand
- manufacturer
- active ingredient
- strength
- form
- category
- prescription required
- image
- status

---

## PharmacyMedicine / Inventory

Possible fields:

- id
- pharmacy
- medicine
- quantity
- price
- stock status
- freshness
- updated at
- updated by
- update method

---

## Reservation

Possible fields:

- id
- user
- pharmacy
- medicine/items
- quantity
- price snapshot
- status
- pickup deadline
- requested at
- confirmed at
- updated at

---

## Prescription

Possible fields:

- id
- user
- file reference
- processing status
- extracted medicines
- confirmed medicines
- created at

---

## StockConfirmationRequest

Possible fields:

- id
- user
- pharmacy
- medicine
- status
- requested at
- responded at
- response quantity
- response price

---

# 34. API Areas

Developer 2 should expose APIs around:

- authentication
- users
- medicines
- pharmacies
- inventory
- search
- related medicines
- reservations
- prescriptions
- stock confirmation
- notifications
- saved items
- admin
- analytics

Developer 1 should consume these through a centralized frontend service layer.

---

# 35. Error and Empty States

Every major user flow must support:

- loading
- success
- empty
- error
- unauthorized
- forbidden
- not found
- offline/network failure

Examples:

### No exact medicine

> We could not find the exact brand nearby.

Then:

> View related products.

### No pharmacies

> No nearby pharmacy currently lists this medicine.

Actions:

- expand search
- ask nearby pharmacies
- save medicine
- change location

### Old stock

> Availability may have changed.

Action:

> Ask Pharmacy

---

# 36. V1 Success Metrics

Primary product metric:

## Search Fulfillment Rate

Percentage of medicine searches where a user finds at least one actionable pharmacy result.

Other useful metrics:

- medicine searches
- exact-match success
- related-match success
- reservation requests
- reservation confirmation rate
- reservation completion rate
- pharmacy response time
- stock freshness percentage
- stale stock percentage
- number of verified pharmacies
- number of medicines listed
- prescription searches
- active users

---

# 37. V1 Acceptance Criteria

MediFind V1 is ready when:

- user can create/login to account
- pharmacy registration entry point exists
- user can search medicine
- user can select location
- relevant pharmacies appear
- each result shows price/quantity where available
- each result shows last updated
- each result shows freshness
- stale stock is labeled honestly
- related medicine products can appear
- user can view medicine details
- user can view pharmacy details
- user can reserve medicine
- reservation begins as pending
- pharmacy receives reservation request
- pharmacy can confirm/reject
- user sees status update
- user can upload prescription
- extracted medicines can be reviewed
- pharmacy matches can be displayed
- user can save medicines/pharmacies
- user can track reservations
- pharmacy can update inventory
- admin can verify pharmacies
- application works on desktop and mobile
- loading/error/empty states exist
- core flows do not depend on fake hardcoded data after API integration

---

# 38. Out of Scope for Initial V1

Unless development capacity permits, the following should not block V1:

- nationwide launch
- direct medicine delivery
- rider application
- payment gateway
- full POS system
- advanced warehouse management
- manufacturer dashboard
- distributor marketplace
- HMO integration
- hospital integration
- real-time IoT monitoring
- advanced demand forecasting
- public API
- native mobile app
- insurance claims
- AI diagnosis
- AI prescribing
- automatic medicine substitution

These may enter future versions.

---

# 39. Future Roadmap

## V2

Potential additions:

- delivery
- payment
- richer pharmacy analytics
- distributor connection
- POS integrations
- stock auto-sync
- richer notifications
- advanced prescription workflow
- shortage detection
- medicine demand forecasting

## V3+

Potential expansion:

- manufacturer intelligence
- public-health analytics
- hospital integrations
- HMO integrations
- partner APIs
- regional/national expansion
- native mobile application

---

# 40. Frontend Development Phases

Developer 1 will work through:

## Phase 1

Frontend Foundation + Design System

## Phase 2

Landing + Authentication + User Home

## Phase 3

Medicine Search + Hybrid Stock + Related Medicines

## Phase 4

Medicine Details + Pharmacy Details + Reservation Experience

## Phase 5

Prescription + Reservations + Saved

## Phase 6

Pharmacy/Admin UI + API Integration + Responsive QA

---

# 41. Product Safety Principles

MediFind must:

- clearly communicate data freshness
- never guarantee stale inventory
- distinguish exact matches from related products
- avoid independent medicine substitution advice
- avoid diagnosis
- avoid prescribing
- protect prescription data
- protect account data
- verify pharmacies before presenting them as verified
- clearly communicate reservation status
- never represent a pending reservation as confirmed

---

# 42. V1 Product Statement

MediFind V1 should allow a person to:

> Search for the exact medicine they need, see which nearby verified pharmacies list it, know how recently the stock was updated, compare price and availability, view related products when the exact brand is unavailable, request confirmation when stock is stale, reserve medicine with pharmacy approval, upload a prescription, and track reservations — on both desktop and mobile.

That is the core product.

Everything built in V1 should strengthen that experience.
