// Page templates
import frontPage from "./front-page";
import page from "./page";
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
  // Post types
  single,
  "single-events": singleEvents,
  "single-resources": singleResources,
  // Archives
  "archive-post": archivePosts,
  "archive-events": archiveEvents,
  "archive-resources": archiveResources,
};
