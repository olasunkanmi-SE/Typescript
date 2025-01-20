// {
//   "ORDI2015100004" => [
//           {
//             membership: {
//               membershipLevel: 'ORDINARY  (01 July current year - 30 June subsequent year)',
//               membershipStartDate: '2/12/2015',
//               membershipEndDate: '31/12/2015',
//               membershipCategory: 'ORDINARY  (01 July current year - 30 June subsequent year)',
//               membershipAccountRegistrationDate: '',
//               membershipStatusCode: '780001',
//               membershipStatusValue: 'New',
//               membershipCustomerName: 'CHONG JU WEN',
//               membershipCustomerId2: '355267'
//             },
//             profile: {
//               UserProfileCompany: '',
//               UserProfileICNo: '8.71E+11',
//               UserProfileNationalityCode: '250001',
//               UserProfileNationality: 'MALAYSIAN',
//               UserProfileMobile: '129454535',
//               UserProfileEmail: 'joven87@yahoo.com',
//               UserProfileRaceCode: '70002',
//               UserProfileRace: 'CHINESE',
//               UserProfileDateOfBirth: '9/7/1987',
//               UserProfileReligionCode: '90012',
//               UserProfileReligion: 'Buddhist',
//               UserProfileGenderCode: '60002',
//               UserProfileGender: 'Female',
//               UserProfileGenderDepartment: 'CHONG JU WEN',
//               UserProfileGenderPosition: '',
//               UserProfileWorkingCompany: 'Marketing Support Associate'
//             },
//             education: {
//               eductionLevel: 'Great Eastern General Insurance(M) Bhd',
//               eductionValue: '210006',
//               eductionInstitute: 'Diploma',
//               eductionFieldOfStudy: 'ASSOCIATION OF BUSINESS EXECUTIVE',
//               educationCgpa: '2005',
//               educationStartDate: '2B2C',
//               educationEndDate: ''
//             },
//             professional: {
//               professionalQualificationName: '',
//               professionalInstituteName: 'PCAB - PCEIA GENERAL INSURANCE AB',
//               professionalQualificationLevelCode: 'THE MALAYSIAN INSURANCE INSTITUTE',
//               professionalQualificationLevel: '1560002',
//               professionalCertificateNumber: 'Certificate',
//               professionalQualificationYear: ''
//             }
//           },
//           {
//             membership: {
//               membershipLevel: 'Affiliate  (01 July current year - 30 June subsequent year)',
//               membershipStartDate: '2/12/2015',
//               membershipEndDate: '31/12/2015',
//               membershipCategory: 'ORDINARY  (01 July current year - 30 June subsequent year)',
//               membershipAccountRegistrationDate: '',
//               membershipStatusCode: '780001',
//               membershipStatusValue: 'New',
//               membershipCustomerName: 'CHONG JU WEN',
//               membershipCustomerId2: '355267'
//             },
//             profile: {
//               UserProfileCompany: '',
//               UserProfileICNo: '8.71E+11',
//               UserProfileNationalityCode: '250001',
//               UserProfileNationality: 'MALAYSIAN',
//               UserProfileMobile: '129454535',
//               UserProfileEmail: 'joven87@yahoo.com',
//               UserProfileRaceCode: '70002',
//               UserProfileRace: 'CHINESE',
//               UserProfileDateOfBirth: '9/7/1987',
//               UserProfileReligionCode: '90012',
//               UserProfileReligion: 'Buddhist',
//               UserProfileGenderCode: '60002',
//               UserProfileGender: 'Female',
//               UserProfileGenderDepartment: 'CHONG JU WEN',
//               UserProfileGenderPosition: '',
//               UserProfileWorkingCompany: 'Marketing Support Associate'
//             },
//             education: {
//               eductionLevel: 'Great Eastern General Insurance(M) Bhd',
//               eductionValue: '210003',
//               eductionInstitute: 'SPM',
//               eductionFieldOfStudy: 'SMK KEAT HWA',
//               educationCgpa: '2004',
//               educationStartDate: '',
//               educationEndDate: ''
//             },
//             professional: {
//               professionalQualificationName: '',
//               professionalInstituteName: 'PCAB - PCEIA GENERAL INSURANCE AB',
//               professionalQualificationLevelCode: 'THE MALAYSIAN INSURANCE INSTITUTE',
//               professionalQualificationLevel: '1560002',
//               professionalCertificateNumber: 'Certificate',
//               professionalQualificationYear: ''
//             }
//           },
//         ]

//   }

//   loop through the values and group them such that
//   in the differnt object, get their values and put them in an array like
//   "ORDI2015100004" => [
//     {
//       membership:[{
//         membershipLevel: 'ORDINARY  (01 July current year - 30 June subsequent year)',
//         membershipStartDate: '2/12/2015',
//         membershipEndDate: '31/12/2015',
//         membershipCategory: 'ORDINARY  (01 July current year - 30 June subsequent year)',
//         membershipAccountRegistrationDate: '',
//         membershipStatusCode: '780001',
//         membershipStatusValue: 'New',
//         membershipCustomerName: 'CHONG JU WEN',
//         membershipCustomerId2: '355267'
//       },{
//         membershipLevel: 'Affiliate  (01 July current year - 30 June subsequent year)',
//         membershipStartDate: '2/12/2015',
//         membershipEndDate: '31/12/2015',
//         membershipCategory: 'ORDINARY  (01 July current year - 30 June subsequent year)',
//         membershipAccountRegistrationDate: '',
//         membershipStatusCode: '780001',
//         membershipStatusValue: 'New',
//         membershipCustomerName: 'CHONG JU WEN',
//         membershipCustomerId2: '355267'
//       },
//     {professional:[ professionalQualificationName: '',
//       professionalInstituteName: 'PCAB - PCEIA GENERAL INSURANCE AB',
//       professionalQualificationLevelCode: 'THE MALAYSIAN INSURANCE INSTITUTE',
//       professionalQualificationLevel: '1560002',
//       professionalCertificateNumber: 'Certificate',
//       professionalQualificationYear: '', { professionalQualificationName: '',
//         professionalInstituteName: 'PCAB - PCEIA GENERAL INSURANCE AB',
//         professionalQualificationLevelCode: 'THE MALAYSIAN INSURANCE INSTITUTE',
//         professionalQualificationLevel: '1560002',
//         professionalCertificateNumber: 'Certificate',
//         professionalQualificationYear: ''}]}]
//     }
//   ]
