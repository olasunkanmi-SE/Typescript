export interface IPersonalRecord {
  membershipNo: string;
  membershipCustomerId1: string;
  membershipLevel: string;
  membershipStartDate: string;
  membershipEndDate: string;
  membershipCategory: string;
  UserProfileCompany: string;
  membershipAccountRegistrationDate: string;
  membershipStatusCode: string;
  membershipStatusValue: string;
  membershipCustomerName: string;
  membershipCustomerId2: string;
  UserProfileICNo: string;
  UserProfileNationalityCode: string;
  UserProfileNationality: string;
  UserProfileMobile: string;
  UserProfileEmail: string;
  UserProfileRaceCode: string;
  UserProfileRace: string;
  UserProfileDateOfBirth: string;
  UserProfileReligionCode: string;
  UserProfileReligion: string;
  UserProfileGenderCode: string;
  UserProfileGender: string;
  UserProfileGenderDepartment: string;
  UserProfileGenderPosition: string;
  UserProfileWorkingCompany: string;
  eductionLevel: string;
  eductionValue: string;
  eductionInstitute: string;
  eductionFieldOfStudy: string;
  GraduationYear: string;
  educationCgpa: string;
  educationStartDate: string;
  educationEndDate: string;
  professionalQualificationName: string;
  professionalInstituteName: string;
  professionalQualificationLevelCode: string;
  professionalQualificationLevel: string;
  professionalCertificateNumber: string;
  professionalQualificationYear: string;
}

export const FIELD_NAMES = [
  "membershipLevel",
  "membershipStartDate",
  "membershipEndDate",
  "membershipCategory",
  "UserProfileCompany",
  "membershipAccountRegistrationDate",
  "membershipStatusCode",
  "membershipStatusValue",
  "membershipCustomerName",
  "membershipCustomerId2",
  "UserProfileICNo",
  "UserProfileNationalityCode",
  "UserProfileNationality",
  "UserProfileMobile",
  "UserProfileEmail",
  "UserProfileRaceCode",
  "UserProfileRace",
  "UserProfileDateOfBirth",
  "UserProfileReligionCode",
  "UserProfileReligion",
  "UserProfileGenderCode",
  "UserProfileGender",
  "UserProfileGenderDepartment",
  "UserProfileGenderPosition",
  "UserProfileWorkingCompany",
  "eductionLevel",
  "eductionValue",
  "eductionInstitute",
  "eductionFieldOfStudy",
  "GraduationYear",
  "educationCgpa",
  "educationStartDate",
  "educationEndDate",
  "professionalQualificationName",
  "professionalInstituteName",
  "professionalQualificationLevelCode",
  "professionalQualificationLevel",
  "professionalCertificateNumber",
  "professionalQualificationYear",
] as const;
