/**
 * Calculates the total score for Group A (Math, Physics, Chemistry).
 * Returns null if any of the required scores are missing.
 */
export const calculateGroupAScore = (
  toan?: number | null, 
  vat_li?: number | null, 
  hoa_hoc?: number | null
): number | null => {
  if (toan == null || vat_li == null || hoa_hoc == null) {
    return null;
  }
  return toan + vat_li + hoa_hoc;
};
