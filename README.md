# Person Search

## Description

Person Search is a Next.js application upgraded to leverage **Next.js 16** and **React 19.2**. It demonstrates advanced search functionality using Next.js Server Components and react-select's `AsyncSelect` component. Users can search for people from a pre-populated list and view detailed information about the selected person.

The upgrade to Next.js 16 builds upon the async API changes from Next.js 15, with Turbopack now enabled by default and various performance improvements. See [docs/upgrading-next-16.md](docs/upgrading-next-16.md) for detailed upgrade notes.

## Features

- Asynchronous search functionality
- Server-side filtering of user data
- Server-rendered and hydrated client-side components
- Single data fetch for improved performance
- Responsive design using Tailwind CSS
- Accessibility-focused UI components from Radix UI
- Custom fonts (Geist Sans and Geist Mono)
- Improved type safety with TypeScript
- Modular and reusable component architecture
- Full database-backed Person CRUD operations (Create, Read, Update, Delete)
- MCP server for Person CRUD via Claude Desktop
- Real-time MCP CRUD testing page at `/mcp-demo`
- Step-by-step setup guide at `/mcp-setup`

## Technologies Used

- **Next.js 16** - React framework with Turbopack by default
- **React 19.2** - Latest React version with View Transitions, useEffectEvent, and Activity
- **TypeScript 5+** - Strongly-typed superset of JavaScript
- **Node.js 20.9+** - Required for compatibility with Next.js 16
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Collection of accessible, unstyled UI components
- **React Hook Form** - Performant and flexible forms library
- **Zod** - TypeScript-first schema declaration and validation library
- **React Select** - Flexible Select Input control for React
- **Sonner** - Lightweight toast notifications for React

### Minimum Node.js Version

The application requires **Node.js 20.9.0** or newer. Node.js 18 is no longer supported in Next.js 16.

## Getting Started


### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/gocallum/person-search.git
   cd person-search
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a `.env.local` file in the root directory and add any necessary environment variables.

### Running the Development Server

```bash
pnpm dev
```

### Other Commands

```bash
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
pnpm mcp:server # Run MCP Person CRUD server
```

## MCP Integration

This repository includes an MCP server that allows Claude Desktop to perform Person CRUD operations directly against the same PostgreSQL database used by the app.

- MCP server: `mcp-server/person-crud-server.mjs`
- Setup instructions page: `/mcp-setup`
- Live MCP demo and test UI: `/mcp-demo`
- Existing app CRUD path: `/` (UI) and `/api/people`

### MCP Tools

- `list_people`
- `get_person`
- `create_person`
- `update_person`
- `delete_person`

## Evaluation Screenshots

Add your screenshots in this folder:

- `public/screenshots/`

Required screenshots you need:

1. App CRUD screen (main app showing create/read/update/delete UI)
2. MCP setup screen (`/mcp-setup` page)
3. MCP demo screen (`/mcp-demo` page with successful operation)
4. Claude Desktop calling `create_person` successfully
5. Claude Desktop calling `get_person` successfully
6. Claude Desktop calling `update_person` successfully
7. Claude Desktop calling `delete_person` successfully
8. App screen showing MCP changes reflected in app data

Replace each `TODO` image path below with your real screenshot filename:

```md
### Week 4 Evidence

![1. App CRUD Screen](public/screenshots/TODO-app-crud.png)
![2. MCP Setup Page](public/screenshots/TODO-mcp-setup.png)
![3. MCP Demo Page](public/screenshots/TODO-mcp-demo.png)
![4. Claude Create Person](public/screenshots/TODO-claude-create.png)
![5. Claude Get Person](public/screenshots/TODO-claude-get.png)
![6. Claude Update Person](public/screenshots/TODO-claude-update.png)
![7. Claude Delete Person](public/screenshots/TODO-claude-delete.png)
![8. MCP Changes Visible In App](public/screenshots/TODO-mcp-reflect-app.png)
```

## How It Works (Next.js 16 & React 19.2)

### Key Changes in `UserSearch` Component

1. **Server Component Design**:
   - The `user-search` component is now a **Server Component**, leveraging `searchParams` and fetching user details server-side.
   - `searchParams` are asynchronous (mandatory in Next.js 16 - synchronous access has been fully removed).

   ```tsx
   export default async function UserSearch({ searchParams }: { searchParams: Promise<{ userId?: string }> }) {
     const resolvedSearchParams = await searchParams;
     const selectedUserId = resolvedSearchParams?.userId || null;
     const user = selectedUserId ? await getUserById(selectedUserId) : null;

     return (
       <div className="space-y-6">
         <SearchInput />
         {selectedUserId && (
           <Suspense fallback={<p>Loading user...</p>}>
             {user ? <UserCard user={user} /> : <p>User not found</p>}
           </Suspense>
         )}
       </div>
     );
   }
   ```

2. **Improved Performance**:
   - Data fetching has been optimized to avoid redundant calls. The user object is fetched once in `user-search` and passed as a prop to child components like `UserCard` and `DeleteButton`.
   - This eliminates multiple fetches, improving performance and reducing server load.

3. **Interaction with `SearchInput`**:
   - `SearchInput` remains a **Client Component**, responsible for interacting with the user through `react-select`'s `AsyncSelect`.
   - When a user is selected, the URL is updated with the user's ID using `window.history.pushState`. This triggers a re-render of `user-search` to reflect the updated state.

4. **Improved Error Handling**:
   - Validations and controlled/uncontrolled input warnings have been resolved by ensuring consistent handling in forms using React Hook Form and Zod.

5. **Concurrency & Hydration**:
   - React 19.2's concurrent rendering and Next.js 16's support for server components ensure seamless server-client hydration, reducing potential mismatches.

### Known Issues

1. **Toast Messages**:
   - Notifications in `DeleteButton` and `MutableDialog` are currently not showing. This requires debugging the integration of the `Sonner` toast library.

2. **Theme Support**:
   - The `theme-provider` for managing dark and light modes has been removed temporarily. The Tailwind stylesheets need to be updated to align with the new Next.js configuration.

3. **Hydration Warnings**:
   - Some hydration warnings may occur due to external browser extensions like Grammarly or differences in runtime environments. Suppression flags have been added, but further testing is recommended.

---

### Updated Project Structure

```
person-search/
├── app/
│   ├── components/
│   │   ├── user-search.tsx
│   │   ├── search-input.tsx
│   │   ├── user-card.tsx
│   │   ├── user-dialog.tsx
│   │   └── user-form.tsx
│   ├── actions/
│   │   ├── actions.ts
│   │   └── schemas.ts
│   └── page.tsx
├── public/
├── .eslintrc.json
├── next.config.js
├── package.json
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

### Using `MutableDialog`

The `MutableDialog` component is a reusable dialog framework that can be used for both "Add" and "Edit" operations. It integrates form validation with Zod and React Hook Form, and supports passing default values for edit operations.

#### How `MutableDialog` Works

`MutableDialog` accepts the following props:
- **`formSchema`**: A Zod schema defining the validation rules for the form.
- **`FormComponent`**: A React component responsible for rendering the form fields.
- **`action`**: A function to handle the form submission (e.g., adding or updating a user).
- **`defaultValues`**: Initial values for the form fields, used for editing existing data.
- **`triggerButtonLabel`**: Label for the button that triggers the dialog.
- **`addDialogTitle` / `editDialogTitle`**: Titles for the "Add" and "Edit" modes.
- **`dialogDescription`**: Description displayed inside the dialog.
- **`submitButtonLabel`**: Label for the submit button.

#### Example: Add Operation

To use `MutableDialog` for adding a new user:

```tsx
import { MutableDialog } from './components/mutable-dialog';
import { userFormSchema, UserFormData } from './actions/schemas';
import { addUser } from './actions/actions';
import { UserForm } from './components/user-form';

export function UserAddDialog() {
  const handleAddUser = async (data: UserFormData) => {
    try {
      const newUser = await addUser(data);
      return {
        success: true,
        message: `User ${newUser.name} added successfully`,
        data: newUser,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to add user: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  };

  return (
    <MutableDialog<UserFormData>
      formSchema={userFormSchema}
      FormComponent={UserForm}
      action={handleAddUser}
      triggerButtonLabel="Add User"
      addDialogTitle="Add New User"
      dialogDescription="Fill out the form below to add a new user."
      submitButtonLabel="Save"
    />
  );
}
```

#### Example: Edit Operation

To use `MutableDialog` for editing an existing user:

```tsx
import { MutableDialog } from './components/mutable-dialog';
import { userFormSchema, UserFormData } from './actions/schemas';
import { updateUser } from './actions/actions';
import { UserForm } from './components/user-form';

export function UserEditDialog({ user }: { user: UserFormData }) {
  const handleUpdateUser = async (data: UserFormData) => {
    try {
      const updatedUser = await updateUser(user.id, data);
      return {
        success: true,
        message: `User ${updatedUser.name} updated successfully`,
        data: updatedUser,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to update user: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  };

  return (
    <MutableDialog<UserFormData>
      formSchema={userFormSchema}
      FormComponent={UserForm}
      action={handleUpdateUser}
      defaultValues={user} // Pre-fill form fields with user data
      triggerButtonLabel="Edit User"
      editDialogTitle="Edit User Details"
      dialogDescription="Modify the details below and click save to update the user."
      submitButtonLabel="Update"
    />
  );
}
```

### Note: Future Refactoring for `ActionState` with React 19

The `MutableDialog` component currently uses a custom `ActionState` type to handle the result of form submissions. However, React 19 introduces built-in support for `ActionState` in Server Actions, which can simplify this implementation. 

#### Improvements to Make:
- Replace the custom `ActionState` interface with React 19's built-in `ActionState`.
- Use the `ActionState` directly within the form submission logic to align with React 19 best practices.
- Refactor error handling and success notifications to leverage React's server-side error handling.

This will be addressed in a future update to ensure the `MutableDialog` component remains aligned with React 19's capabilities.

## Contributing

Contributions are welcome! Please submit a Pull Request with your changes.

## License

This project is open source and available under the [MIT License](LICENSE).


## Contact

Callum Bir - [@callumbir](https://twitter.com/callumbir)  
Project Link: [https://github.com/gocallum/person-search](https://github.com/gocallum/person-search)  

