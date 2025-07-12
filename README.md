<div align="center">
  <h1>Next.js Notion Starter</h1>
  <p>
		<b>A minimal example project that integrates Next.js with the <a href="https://github.com/makenotion/notion-sdk-js">Notion SDK</a></b>
	</p>
	<br>
</div>

# Usage

## Create a Notion Integration Key
Go to <a href="https://developers.notion.com/">Notion Developers</a>, create a new integration, and copy the generated Internal Integration Token.

## Set up .env file
Create a .env file in the root directory and add the following environment variables:

```
NOTION_TOKEN=your_integration_key_here
NOTION_PAGE_ID=your_notion_page_id_here
```

## Run the project
Install dependencies and start the development server:

``` bash
npm install
npm run dev
```
