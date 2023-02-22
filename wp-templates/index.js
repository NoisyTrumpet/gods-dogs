// Page templates
import frontPage from "./front-page";
import page from "./page";
import pageAdoptADog from "./page-adopt-a-dog";
// Post types
import single from "./single";
import singleEvents from "./single-events";
import singleResources from "./single-resources";
// Archives:
import archivePosts from "./archive-post";
import archiveEvents from "./archive-events";
import archiveResources from "./archive-resources";

export default {
  "front-page": frontPage,
  page,
  "page-adopt-a-dog": pageAdoptADog,
  // Post types
  single,
  "single-events": singleEvents,
  "single-resources": singleResources,
  // Archives
  "archive-post": archivePosts,
  "archive-events": archiveEvents,
  "archive-resources": archiveResources,
};
