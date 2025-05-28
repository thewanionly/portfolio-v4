export enum DeviceType {
  Mobile = 'mobile',
  Tablet = 'tablet',
  Desktop = 'desktop',
}

const detectDeviceType = (userAgent: string): DeviceType => {
  const ua = userAgent.toLowerCase();

  // Mobile devices
  if (
    ua.includes('mobile') ||
    ua.includes('android') ||
    ua.includes('iphone') ||
    ua.includes('ipod') ||
    ua.includes('blackberry') ||
    ua.includes('windows phone')
  ) {
    return DeviceType.Mobile;
  }

  // Tablets
  if (
    ua.includes('tablet') ||
    ua.includes('ipad') ||
    ua.includes('kindle') ||
    ua.includes('silk') ||
    (ua.includes('android') && !ua.includes('mobile'))
  ) {
    return DeviceType.Tablet;
  }

  // Default to desktop
  return DeviceType.Desktop;
};

export const getDeviceTypeFromRequest = (request: Request): DeviceType => {
  const userAgent = request.headers.get('user-agent') || '';

  return detectDeviceType(userAgent);
};
