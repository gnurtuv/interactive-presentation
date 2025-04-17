// src/slidesData.js
import TitleSlide from './components/TitleSlide';
import ImageSlide from './components/ImageSlide';
import TextSlide from './components/TextSlide';
import InteractivePoll from './components/InteractivePoll';
import ComparisonSlide from './components/ComparisonSlide';

// Import hình ảnh (đảm bảo bạn có các file ảnh này trong src/assets/images)
import opportunityImg from './assets/images/opportunity.jpg';
import challengeImg from './assets/images/challenge.jpg';
import cyberbullyingImg from './assets/images/cyberbullying.jpg';
import fakeNewsImg from './assets/images/fake-news.jpg';
import realNewsImg from './assets/images/real-news.jpg';

const slides = [
  {
    id: 0,
    component: TitleSlide,
    content: {
      title: 'Người Trẻ & Văn Hóa Ứng Xử Trên Mạng',
      subtitle: 'Cơ Hội và Thách Thức',
    },
  },
  {
    id: 1,
    component: TextSlide,
    content: {
      text: 'Internet: Một thế giới phẳng mở ra vô vàn cơ hội...',
    },
  },
  {
    id: 2,
    component: ImageSlide,
    content: {
      imageUrl: opportunityImg, // Sử dụng ảnh đã import
      caption: 'Kết nối toàn cầu, học hỏi không giới hạn, thể hiện bản thân.',
    },
  },
  {
    id: 3,
    component: InteractivePoll, // Slide tương tác đầu tiên
    content: {
      question: 'Bạn thấy cơ hội nào là lớn nhất cho người trẻ trên mạng?',
      options: ['Học tập & Phát triển', 'Kết nối bạn bè', 'Kinh doanh Online', 'Thể hiện quan điểm'],
    },
  },
   {
    id: 4,
    component: TextSlide,
    content: {
      text: '...Nhưng cũng tiềm ẩn không ít thách thức.',
    },
  },
  {
    id: 5,
    component: ImageSlide,
    content: {
      imageUrl: challengeImg, // Ảnh về thách thức
      caption: 'Tin giả, bắt nạt mạng, nghiện internet, vấn đề riêng tư...',
    },
  },
  {
      id: 6,
      component: ComparisonSlide,
      content: {
          title: "Thách thức: Xác minh tin tức trên mạng",
          item1: { image: fakeNewsImg, label: "Tin giả?" },
          item2: { image: realNewsImg, label: "Tin thật?" },
          revealText: "Hãy kiểm chứng thông tin mà bạn đọc!"
      }
  },
  {
    id: 7,
    component: ImageSlide,
    content: {
      imageUrl: cyberbullyingImg, // Ảnh về cyberbullying
      caption: 'Bắt nạt trên mạng gây tổn thương sâu sắc.',
    },
  },
  {
    id: 8,
    component: InteractivePoll, // Slide tương tác thứ hai
    content: {
      question: 'Theo bạn, thách thức nào đáng lo ngại nhất hiện nay?',
      options: ['Tin giả (Fake News)', 'Bắt nạt trên mạng', 'Nghiện mạng xã hội', 'Quyền riêng tư'],
    },
  },
  {
    id: 9,
    component: TextSlide,
    content: {
      text: 'Xây dựng văn hóa ứng xử tích cực trên mạng là trách nhiệm của mỗi chúng ta.',
    },
  },
   {
    id: 10,
    component: TitleSlide,
    content: {
      title: 'Cảm ơn đã lắng nghe!',
      subtitle: 'Q&A',
    },
  },
  // Thêm các slide khác nếu cần...
];

export default slides;