import { getProjectsFromLocalStorage } from './modules/logic/projectManager.js';
import { populateSidebar } from './modules/components/sidebar.js';

const projects = getProjectsFromLocalStorage();
populateSidebar(projects);