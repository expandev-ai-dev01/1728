/**
 * @page HomePage
 * @summary Home page displaying welcome message
 * @domain core
 * @type page-component
 * @category public
 */
export const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to NoteBox</h1>
      <p className="text-lg text-gray-600 mb-8">
        Quick notes app with search and tag categorization
      </p>
    </div>
  );
};

export default HomePage;
