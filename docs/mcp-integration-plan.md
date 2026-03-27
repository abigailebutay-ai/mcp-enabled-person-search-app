# MCP Integration Plan

## Goal
Deliver an MCP-enabled Person application with full CRUD support in both the web app and Claude Desktop MCP workflow.

## Scope
- Keep existing Week 3 CRUD behavior intact.
- Add a Prisma-backed MCP server for Person CRUD.
- Add in-app real-time MCP CRUD testing interface.
- Add evaluator docs for setup, config, and validation.

## Implementation Checklist
- [x] Create MCP server at `mcp-server/person-crud-server.mjs`
- [x] Add MCP demo API route at `app/api/mcp-demo/route.ts`
- [x] Add live tester UI at `app/mcp-demo/page.tsx`
- [x] Add setup guide at `app/mcp-setup/page.tsx`
- [x] Update app navigation and docs pages
- [ ] Validate with lint/build

## Verification Steps
1. Run `pnpm dev`.
2. Open `/mcp-demo` and run all five operations.
3. Validate CRUD changes appear on `/` and in database-backed search.
4. Connect Claude Desktop using `/mcp-setup` config and run same operations.
