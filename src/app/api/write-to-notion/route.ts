import { Client } from "@notionhq/client";
import { Classes } from "../get-classes/route";

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const dbId = process.env.NOTION_CLASSES_DB;

export async function POST(req: Request) {
    const classesRes = await fetch("http://localhost:3000/api/get-classes");
    const classesData: Classes[] = await classesRes.json();

    const notionClasses = classesData.map(
        async (classItem) =>
            await notion.pages.create({
                parent: {
                    type: "database_id",
                    database_id: dbId!,
                },
                properties: {
                    Location: {
                        type: "rich_text",
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: classItem.ROOM,
                                },
                            },
                        ],
                    },
                    Module_ID: {
                        type: "rich_text",
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: classItem.MODID,
                                },
                            },
                        ],
                    },
                    DateTime: {
                        type: "date",
                        date: {
                            start: classItem.TIME_FROM_ISO,
                            end: classItem.TIME_TO_ISO,
                        },
                    },
                    Lecturer: {
                        type: "rich_text",
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: classItem.NAME,
                                },
                            },
                        ],
                    },
                    Name: {
                        type: "title",
                        title: [
                            {
                                type: "text",
                                text: {
                                    content: classItem.MODULE_NAME,
                                },
                            },
                        ],
                    },
                },
            })
    );

    const response = await Promise.all(notionClasses);

    return Response.json(response);
}
