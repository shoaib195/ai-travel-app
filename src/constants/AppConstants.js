import { AppImages } from "./AppImages";

export const AppConstants = {
    buttonActiveOpacity: 0.8,
    otpTimer: 60,
    DoctorCard: {
        name: 'Not Available',
        specialty: 'Not Specified',
        rating: 0,
        fee: 0,
    },

  categoryData : [
        {name: 'Cardiologist', icon: AppImages.demoImage},
        {name: 'Dermatologist', icon: AppImages.demoImage},
        {name: 'Gastroenterologist', icon: AppImages.demoImage},
        {name: 'Cardiologist', icon: AppImages.demoImage},
        {name: 'Neurologist', icon: AppImages.demoImage},
      ],
    
    doctors: [
        {name: 'Dr. Jason Miller',icon: AppImages.demoImage, specialty: 'Neurologist', rating: 4.9, fee: 30},
        {name: 'Dr. Sarah Lee', icon: AppImages.demoImage, specialty: 'Dentist', rating: 4.7, fee: 40},
        {name: 'Dr. Ahmed Khan', icon: AppImages.demoImage, specialty: 'Cardiologist', rating: 4.8, fee: 50},
        {name: 'Dr. Lisa Wong', icon: AppImages.demoImage, specialty: 'Dermatologist', rating: 4.5, fee: 35},
        {name: 'Dr. Jason Miller', icon: AppImages.demoImage, specialty: 'Neurologist', rating: 4.9, fee: 30},
        {name: 'Dr. Sarah Lee', icon: AppImages.demoImage, specialty: 'Dentist', rating: 4.7, fee: 40},
        {name: 'Dr. Ahmed Khan', icon: AppImages.demoImage, specialty: 'Cardiologist', rating: 4.8, fee: 50},
        {name: 'Dr. Lisa Wong', icon: AppImages.demoImage, specialty: 'Dermatologist', rating: 4.5, fee: 35},
        {name: 'Dr. Lisa Wong', icon: AppImages.demoImage, specialty: 'Dermatologist', rating: 4.5, fee: 35},
      ],
     timeSlots : [
        {day: 'Mon', time: '11:30 AM - 04:00PM'},
        {day: 'Tue', time: '11:30 AM - 04:00PM'},
        {day: 'Wed', time: '11:30 AM - 04:00PM'},
        {day: 'Thu', time: '11:30 AM - 04:00PM'},
        {day: 'Fri', time: '11:30 AM - 04:00PM'},
        {day: 'Sat', time: '11:30 AM - 04:00PM'},
        {day: 'Sun', time: '11:30 AM - 04:00PM'},
      ],

      consultantAbout : [
        {title: 'Consultation Fee', value: '$30'},
        {title: 'Attended Patients', value: '2000+'},
        {title: 'Average Session', value: '20 Mins'},
      ],

        cities : [
        {label: 'Karachi', value: 'Karachi'},
        {label: 'Lahore', value: 'Lahore'},
        {label: 'Faisalabad', value: 'Faisalabad'},
        {label: 'Rawalpindi', value: 'Rawalpindi'},
        {label: 'Islamabad', value: 'Islamabad'},
      ],
}