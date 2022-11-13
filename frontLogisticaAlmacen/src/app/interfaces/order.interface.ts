export interface Order {
    id?: Number,
    out_date: Date,
    truck_plate: String,
    comment: String,
    stateId: Number,
    state?: String,
    originId: Number,
    origin?: String,
    destinyId: Number,
    destiny?: String
}
