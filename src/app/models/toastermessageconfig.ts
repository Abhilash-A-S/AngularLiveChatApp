export class ToasterMessage {
    static messageConfig(): Record<string, object> {
        return {
            "Success": {
                "icon": "",
                "style": {
                    'background-color': '#519f2e',
                    'color': '#fff'
                }
            },
            "Error": {
                "icon": "",
                "style": {
                    'background-color': '#e25241',
                    'color': '#fff'
                }
            },
            "Warning": {
                "icon": "",
                "style": {
                    'background-color': '#ecaf41',
                    'color': '#fff'
                }
            },
            "Neutral": {
                "icon": "",
                "style": {
                    'background-color': '#616161',
                    'color': '#fff'
                }
            }
        }
    }
}