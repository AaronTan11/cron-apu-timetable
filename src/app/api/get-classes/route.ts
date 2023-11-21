import { Client } from "@notionhq/client";
import { DateTime } from "luxon";

export const dynamic = "force-dynamic"; // defaults to force-static

export type Classes = {
    INTAKE: string;
    MODID: string;
    MODULE_NAME: string;
    DAY: string;
    LOCATION: string;
    ROOM: string;
    LECTID: string;
    NAME: string;
    SAMACCOUNTNAME: string;
    DATESTAMP: string;
    DATESTAMP_ISO: string;
    TIME_FROM: string;
    TIME_TO: string;
    TIME_FROM_ISO: string;
    TIME_TO_ISO: string;
    GROUPING: string;
    CLASS_CODE: string;
    COLOR: string;
};

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const dbId = process.env.NOTION_CLASSES_DB;

export async function GET(req: Request) {
    const res = await fetch("https://s3-ap-southeast-1.amazonaws.com/open-ws/weektimetable", {
        headers: {
            "Content-Type": "application/json",
        },
    });

    const notionClasses = await notion.databases.query({
        database_id: dbId!,
        filter: {
            property: "Class_Time",
            date: {
                is_not_empty: true,
            },
        },
    });

    const classTimeInNotion = notionClasses.results.map((result) => {
        if (
            "properties" in result &&
            "Class_Time" in result.properties &&
            "date" in result.properties.Class_Time
        ) {
            const data = DateTime.fromISO(result.properties.Class_Time.date!.start);
            const localDateTime = data.toLocal();
            const formattedDateTime = localDateTime.toFormat("yyyy-LL-dd'T'HH:mm:ssZZ");
            return formattedDateTime;
        }
    });

    const data: Classes[] = await res.json();

    const myIntake = data.filter((item) => item.INTAKE === "APU2F2311SE");

    const filterOutExistingSchedules = myIntake.filter(
        (element) => !classTimeInNotion.includes(element.TIME_FROM_ISO!)
    );

    return Response.json(filterOutExistingSchedules);
}
