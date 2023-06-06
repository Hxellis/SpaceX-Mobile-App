import { gql } from "@apollo/client";

export const GET_ROCKETS = gql`
    query Rockets {
        rockets {
            id
            name
            description
            company
            country
        
            active
            success_rate_pct
            cost_per_launch
            first_flight
        
            type
            mass {
              kg
            }
            height {
              meters
            }
            diameter {
              meters
            }
            engines {
              type
            }
            boosters
            landing_legs {
              number
              material
            }
            payload_weights {
                name
                kg
            }
            wikipedia
          }
    }
`;