export class VacationModel {
    public constructor(
        public vacationId?: number,
        public description?: string,
        public destination?: string,
        public imageFileName?: string,
        public startVacationDate?: string,
        public endVacationDate?: string,
        public price?: number,
        public totalFollowers ?: number
    ) { }
}
