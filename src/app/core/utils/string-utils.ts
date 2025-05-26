export class StringUtils {
  static formatFeatureName(featureName: string): string {
    return featureName
      .replace('FEATURE_', '')
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (match) => match.toUpperCase());
  }

  static formatRoleName(roleName: string): string {
    return roleName
      .replace('ROLE_', '')
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (match) => match.toUpperCase());
  }

  static normalizeRoleName(name: string, withPrefix: boolean = false): string {
    const normalized = name.trim().toUpperCase().replace(/\s+/g, '_');
    return withPrefix ? `ROLE_${normalized}` : normalized;
  }

  static normalizeFeatureName(name: string): string {
    return name.trim().toUpperCase().replace(/\s+/g, '_');
  }

static formatJenisKelamin(jk: string | null | undefined): string {
  if (!jk) {
    return 'Tidak Diketahui';
  }
  switch (jk) {
    case 'LAKI_LAKI':
      return 'Laki-laki';
    case 'PEREMPUAN':
      return 'Perempuan';
    default:
      return 'Tidak Diketahui';
  }
}
}
