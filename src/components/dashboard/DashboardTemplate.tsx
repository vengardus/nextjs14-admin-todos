import { WidgetItem } from "./widgets/WidgetItem"

export const DashboardTemplate = () => {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <WidgetItem />
        </div>
    )
}
