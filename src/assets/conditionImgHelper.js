import clearday from "../assets/images/conditions/sunny.png";
import partlycloudyday from "../assets/images/conditions/partly-cloudy.png";
import cloudy from "../assets/images/conditions/cloudy.png";
import rain from "../assets/images/conditions/rainy.png";
import snow from "../assets/images/conditions/snowy.png";

export function imageSrc (icon) {
  switch (true) {
    case icon === 'snow':
      return snow;

    case icon === 'clear-day':
      return clearday;

    case icon === 'partly-cloudy-day':
      return partlycloudyday;
    
    case icon === 'rain':
      return rain;

    default:
      return cloudy;
  }
};