const BASE_URL = 'https://8b4c-103-165-222-114.ngrok-free.app/api/v1';

export const environment = {
  production: false,
  userBaseURL: `${BASE_URL}/users`,
  authBaseURL: `${BASE_URL}/auth`,
  rolesBaseURL: `${BASE_URL}/roles`,
  roleFeatureBaseURL: `${BASE_URL}/role-features`,
  plafondsBaseURL: `${BASE_URL}/plafonds`,
  pegawaiProfileBaseURL: `${BASE_URL}/pegawaiprofile`,
  pegawaiBaseURL: `${BASE_URL}/pegawai`,
  loanRequestBaseURL: `${BASE_URL}/loan-requests`,
  loanApprovalsBaseURL: `${BASE_URL}/loan-approvals`,
  featuresBaseURL: `${BASE_URL}/features`,
  dashboardBaseURL: `${BASE_URL}/dashboard`,
  profileCustomerBaseURL: `${BASE_URL}/profile-customer`,
  customerBaseURL: `${BASE_URL}/customer`,
  branchesBaseURL: `${BASE_URL}/branches`,
};
