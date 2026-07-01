const imageFiles = import.meta.glob('../assets/images/*.{jpeg,jpg,png,webp}', { eager: true, query: '?url', import: 'default' });

export const getImages = () => {
  return Object.values(imageFiles) as string[];
};
