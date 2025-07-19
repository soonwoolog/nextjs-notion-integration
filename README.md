
<div align="center">
  <h1>Next.js Notion Integration</h1>
  <p>
		<b>A tool that helps integrate Next.js with the <a href="https://github.com/makenotion/notion-sdk-js">Notion SDK</a></b>
	</p>
	<br>
</div>

## Introduction
Want to build your site using Notion?
Here’s the thing: Notion content is all made up of <a href="https://developers.notion.com/docs/working-with-page-content">blocks</a>, so you'll need to render every single block type.
This tool helps you do exactly that!

## Project Setup
### Installation
```
npm i nextjs-notion-integration
```

### Create a Notion Integration Key
Go to <a href="https://developers.notion.com/">Notion Developers</a>, create a new integration, and copy the generated Internal Integration Token.

### Set up .env file
Create a .env file in the root directory and add the following environment variables:

```
NOTION_TOKEN=your_integration_key_here
NOTION_PAGE_ID=your_notion_page_id_here
```

## How to make components
Check out the ```examples``` folder in the project. You can use the components in the folder or customize them yourself.
