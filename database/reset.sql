-- Reset Database Script
-- This script clears all application data and resets AUTO_INCREMENT for all tables.

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE `interview_sessions`;
TRUNCATE TABLE `job_roles`;
TRUNCATE TABLE `job_matches`;
TRUNCATE TABLE `notifications`;
TRUNCATE TABLE `resumes`;
TRUNCATE TABLE `skills`;
TRUNCATE TABLE `students`;
TRUNCATE TABLE `activity_logs`;

SET FOREIGN_KEY_CHECKS = 1;
