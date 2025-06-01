const baseUrl = 'http://34.72.32.238/api/v1';
// baseUrl = http://34.72.32.238/api/v1
// localhost:8080/api/v1

export const environment = {
  production: true,
  userBaseURL: `${baseUrl}/users`,
  authBaseURL: `${baseUrl}/auth`,
  rolesBaseURL: `${baseUrl}/roles`,
  roleFeatureBaseURL: `${baseUrl}/role-features`,
  plafondsBaseURL: `${baseUrl}/plafonds`,
  pegawaiProfileBaseURL: `${baseUrl}/pegawaiprofile`,
  pegawaiBaseURL: `${baseUrl}/pegawai`,
  loanRequestBaseURL: `${baseUrl}/loan-requests`,
  loanApprovalsBaseURL: `${baseUrl}/loan-approvals`,
  featuresBaseURL: `${baseUrl}/features`,
  dashboardBaseURL: `${baseUrl}/dashboard`,
  profileCustomerBaseURL: `${baseUrl}/profile-customer`,
  customerBaseURL: `${baseUrl}/customer`,
  branchesBaseURL: `${baseUrl}/branches`,
};
