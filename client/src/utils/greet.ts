export const greet = () => {
    const currentHour = new Date().getHours();
    let greeting;

    switch (true) {
      case currentHour >= 5 && currentHour < 12:
        greeting = 'Good Morning';
        break;
      case currentHour >= 12 && currentHour < 17:
        greeting = 'Good Afternoon';
        break;
      case currentHour >= 17 && currentHour < 22:
        greeting = 'Good Evening';
        break;
      default:
        greeting = 'Happy Late Night';
    }

    return greeting;
  };