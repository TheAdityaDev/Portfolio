const Project = require("../models/Project");
const { isDatabaseReady } = require("../config/db");

const dummyProjects = [
  {
    _id: "1",
    title: "Royal E-Commerce Platform",
    category: "Web Design",
    description:
      "A luxurious e-commerce platform designed for premium brands, featuring elegant product showcases, smooth animations, and seamless checkout experience. Built with modern web technologies and optimized for conversion.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "https://royal-ecommerce.demo",
    githubUrl: "https://github.com/portfolio/royal-ecommerce",
    featured: true,
    year: "2024",
  },
  {
    _id: "2",
    title: "Golden Brand Identity",
    category: "Branding",
    description:
      "Complete brand identity design for a luxury jewelry company, including logo design, color palette, typography, and brand guidelines. Created cohesive visual language across all touchpoints.",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=800&h=600&fit=crop",
    technologies: ["Adobe Illustrator", "Photoshop", "Figma"],
    liveUrl: "https://golden-brand.demo",
    githubUrl: null,
    featured: true,
    year: "2024",
  },
  {
    _id: "3",
    title: "Portfolio Management App",
    category: "Development",
    description:
      "A comprehensive portfolio management application for investment professionals, featuring real-time data visualization, risk analysis, and automated reporting capabilities.",
    image: "https://images.pixabay.com/photo/2016/11/27/21/42/stock-1863880_1280.jpg?w=800&h=600&fit=crop",
    technologies: ["Vue.js", "Python", "PostgreSQL", "D3.js"],
    liveUrl: "https://portfolio-mgmt.demo",
    githubUrl: "https://github.com/portfolio/portfolio-mgmt",
    featured: false,
    year: "2023",
  },
  {
    _id: "4",
    title: "Luxury Hotel Website",
    category: "Web Design",
    description:
      "Elegant website design for a 5-star luxury hotel chain, featuring immersive galleries, booking integration, and premium user experience with sophisticated animations.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    technologies: ["React", "GSAP", "Sanity CMS", "Stripe"],
    liveUrl: "https://luxury-hotel.demo",
    githubUrl: "https://github.com/portfolio/luxury-hotel",
    featured: true,
    year: "2024",
  },
  {
    _id: "5",
    title: "Corporate Identity Suite",
    category: "Branding",
    description:
      "Complete corporate identity design for a financial services firm, including logo, business cards, letterheads, and digital brand assets with professional color schemes.",
    image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?w=800&h=600&fit=crop",
    technologies: ["Adobe Creative Suite", "Brand Guidelines"],
    liveUrl: "https://corporate-identity.demo",
    githubUrl: null,
    featured: false,
    year: "2023",
  },
  {
    _id: "6",
    title: "Analytics Dashboard",
    category: "Development",
    description:
      "Advanced analytics dashboard for business intelligence, featuring interactive charts, real-time data updates, and customizable reporting with modern UI components.",
    image: "https://images.pixabay.com/photo/2016/11/23/14/45/coding-1853305_1280.jpg?w=800&h=600&fit=crop",
    technologies: ["React", "TypeScript", "Chart.js", "Express"],
    liveUrl: "https://analytics-dash.demo",
    githubUrl: "https://github.com/portfolio/analytics-dash",
    featured: true,
    year: "2024",
  },
  {
    _id: "7",
    title: "Fashion Brand Website",
    category: "Web Design",
    description:
      "Modern fashion brand website with dynamic product galleries, size guides, and seamless shopping experience optimized for mobile and desktop users.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    technologies: ["Next.js", "Shopify", "Tailwind CSS"],
    liveUrl: "https://fashion-brand.demo",
    githubUrl: "https://github.com/portfolio/fashion-brand",
    featured: false,
    year: "2023",
  },
  {
    _id: "8",
    title: "Restaurant Brand Package",
    category: "Branding",
    description:
      "Complete branding package for an upscale restaurant including menu design, logo creation, interior signage, and digital marketing materials with elegant typography.",
    image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?w=800&h=600&fit=crop",
    technologies: ["Adobe InDesign", "Illustrator", "Print Design"],
    liveUrl: "https://restaurant-brand.demo",
    githubUrl: null,
    featured: true,
    year: "2024",
  },
  {
    _id: "9",
    title: "Task Management System",
    category: "Development",
    description:
      "Comprehensive task management system for teams with project tracking, time management, collaboration tools, and advanced reporting capabilities.",
    image: "https://images.pixabay.com/photo/2016/11/29/06/15/plans-1867745_1280.jpg?w=800&h=600&fit=crop",
    technologies: ["Angular", "Node.js", "MySQL", "Socket.io"],
    liveUrl: "https://task-mgmt.demo",
    githubUrl: "https://github.com/portfolio/task-mgmt",
    featured: false,
    year: "2023",
  },
];

const getProjects = async (req, res) => {
  try {
    if (!isDatabaseReady()) {
      return res.json(dummyProjects);
    }

    const projects = await Project.find().lean();
    return res.json(projects.length > 0 ? projects : dummyProjects);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    return res.json(dummyProjects);
  }
};

const createProject = async (req, res) => {
  try {
    if (!isDatabaseReady()) {
      return res.status(503).json({
        message: "Database is not configured. Add MONGODB_URI to enable project creation.",
      });
    }

    const newProject = new Project(req.body);
    const savedProject = await newProject.save();

    return res.status(201).json(savedProject);
  } catch (error) {
    console.error("Error creating project:", error.message);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getProjects,
  createProject,
};
