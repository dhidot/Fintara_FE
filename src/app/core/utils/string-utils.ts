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
}
