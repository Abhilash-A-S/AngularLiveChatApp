export class Utility {
    static guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    static alphaNumericSorting(sortArray: any, sortName: string) {
        sortArray.sort((a: any, b: any) => {
            const aValue = a[sortName]?.toLowerCase();
            const bValue = b[sortName]?.toLowerCase()
            return aValue.localeCompare(bValue, 'da', {
                numeric: true,
                sensitivity: 'base'
            });
        });
        return sortArray
    }
}