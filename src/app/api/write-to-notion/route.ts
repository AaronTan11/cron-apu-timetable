import { Client } from "@notionhq/client";
import { Classes } from "../get-classes/route";
import { GET } from "../get-classes/route";

export const dynamic = "force-dynamic";

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

export async function POST(req: Request) {
    const classesRes = await GET(req);
    const classesData: Classes[] = await classesRes.json();

    const notionClasses = classesData.map(
        async (classItem) =>
            await notion.pages.create({
                parent: {
                    type: "database_id",
                    database_id: process.env.NOTION_CLASSES_DB!,
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
                    Class_Time: {
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
