-- Development seed data (NOT authoritative real-world data).
-- Career names/domains reflect real vocational categories in India,
-- but eligibility/duration/cost strings are illustrative placeholders.

insert into careers (id, name, domain, description, eligibility, training, skills, duration, work_environment) values
('elec-iti', 'Electrician', 'Electronics', 'Install, wire and maintain electrical systems in buildings and industry.', 'Class 10 pass', 'ITI diploma', ARRAY['wiring','circuits','safety'], '2 years', 'Workshop'),
('welder', 'Welder', 'Manufacturing', 'Join metals using welding and cutting processes.', 'Class 8-10', 'ITI trade course', ARRAY['welding','blueprint reading','safety'], '1-2 years', 'Workshop'),
('nursing-asst', 'Nursing Assistant', 'Healthcare', 'Support nurses and doctors in hospitals and clinics.', 'Class 12 pass', 'Certificate/diploma', ARRAY['patient care','hygiene','communication'], '6-12 months', 'Healthcare'),
('agri-technician', 'Agriculture Technician', 'Agriculture', 'Support crop production, irrigation and farm machinery.', 'Class 10 pass', 'Diploma/certificate', ARRAY['soil science','irrigation','machinery'], '1-2 years', 'Outdoor'),
('solar-tech', 'Solar PV Technician', 'Renewable Energy', 'Install and maintain rooftop and field solar plants.', 'Class 10 + ITI', 'NSDC/ITI programme', ARRAY['wiring','panel installation','safety'], '6 months-1 year', 'Outdoor'),
('auto-mechanic', 'Automotive Mechanic', 'Automotive', 'Repair and service two-wheelers and automobiles.', 'Class 10', 'ITI trade course', ARRAY['engine repair','diagnostics','servicing'], '2 years', 'Workshop'),
('medical-lab-tech', 'Medical Laboratory Technician', 'Healthcare', 'Run diagnostic tests in clinical labs.', 'Class 12 (Science)', 'DMLT programme', ARRAY['lab testing','sample collection','records'], '2 years', 'Laboratory'),
('logistics-exec', 'Logistics Executive', 'Logistics', 'Coordinate shipments, warehouses and deliveries.', 'Class 12', 'Diploma/certificate', ARRAY['inventory','coordination','documentation'], '6-12 months', 'Office'),
('chef-hospitality', 'Commis Chef', 'Tourism & Hospitality', 'Prepare food in hotels and restaurants.', 'Class 10', 'IHM/hospitality course', ARRAY['cooking','kitchen hygiene','teamwork'], '6-12 months', 'Industrial'),
('retail-sales', 'Retail Sales Associate', 'Retail & Services', 'Assist customers in stores and showrooms.', 'Class 10-12', 'Retail skills programme', ARRAY['customer service','communication','inventory'], '3-6 months', 'Customer-facing'),
('plumber', 'Plumber', 'Construction', 'Install and repair water and drainage systems.', 'Class 8-10', 'ITI/skills training', ARRAY['pipe fitting','drainage','tools'], '1-2 years', 'Field'),
('graphic-designer', 'Graphic Designer', 'Design & Media', 'Create visual designs for print and digital media.', 'Class 12', 'Diploma/certificate', ARRAY['design','software basics','creativity'], '6-12 months', 'Creative'),
('embedded-tech', 'Embedded Systems Technician', 'Technology', 'Assemble and debug embedded electronic boards.', 'ITI/Diploma', 'Technical diploma', ARRAY['circuits','soldering','testing'], '1-2 years', 'Laboratory'),
('bns-tech', 'BNS Technician', 'Public Services', 'Assist in basic public-sector field operations.', 'Class 10-12', 'Departmental training', ARRAY['fieldwork','records','teamwork'], '3-6 months', 'Field')
on conflict (id) do nothing;

-- Scholarships / affordability: intentionally left empty.
-- Only add rows from verified official sources; do not fabricate amounts.
