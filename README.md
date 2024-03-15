For project initialization I have used a tool Vite, that helps to create a basic template for React + TypeScript app.
To run the app you need to
- install packages `npm install`
- run using `npm run dev`

In addition to Vite functionality I installed packages for using Material UI components:
- @mui/material
- @mui/icons-material
- @mui/lab (for skeleton)

There is a single component Table divided into subcomponents.
For API requests I use built-in Fetch API.

In the Table component I use such React Hooks as useState for managing state (fetched data, sorting settings, loading status) and useEffect for data fetching. I also added an AbortController that allows to abort previous requests if, for example, user clicked the 'Next page' button a few times in a row.

As for adding CSS styles, for this task using `sx` prop of MUI components is sufficient.
We can also use plain CSS imported to global index file, styled components, TailwindCSS etc.

Here I didn't pay much attention to styling, as I don't get design provided, but focused on exact implementation of the requirements for the task.  