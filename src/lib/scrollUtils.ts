// Utility functions for smooth scrolling

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 80; // Offset untuk navbar
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Navigate to page and scroll to section
export const navigateAndScroll = (path: string, sectionId?: string) => {
  // Jika sudah di halaman yang sama, langsung scroll
  if (window.location.pathname === path && sectionId) {
    setTimeout(() => scrollToSection(sectionId), 100);
  } else {
    // Jika beda halaman, simpan section ID di sessionStorage
    if (sectionId) {
      sessionStorage.setItem('scrollToSection', sectionId);
    }
    window.location.href = path;
  }
};
