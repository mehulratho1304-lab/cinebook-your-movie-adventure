import { createContext, useContext, useState, ReactNode } from "react";

interface BookingState {
  movieId: string | null;
  theatreId: string | null;
  showTime: string | null;
  selectedSeats: string[];
  date: string | null;
}

interface BookingContextType extends BookingState {
  setMovieId: (id: string) => void;
  setTheatre: (id: string, time: string) => void;
  setDate: (date: string) => void;
  toggleSeat: (seat: string) => void;
  resetBooking: () => void;
  totalPrice: number;
  seatPrice: number;
}

const BookingContext = createContext<BookingContextType | null>(null);

const initial: BookingState = {
  movieId: null,
  theatreId: null,
  showTime: null,
  selectedSeats: [],
  date: null,
};

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<BookingState>(initial);
  const seatPrice = 250;

  const setMovieId = (id: string) => setState((s) => ({ ...s, movieId: id, selectedSeats: [] }));
  const setTheatre = (id: string, time: string) =>
    setState((s) => ({ ...s, theatreId: id, showTime: time, selectedSeats: [] }));
  const setDate = (date: string) => setState((s) => ({ ...s, date }));
  const toggleSeat = (seat: string) =>
    setState((s) => ({
      ...s,
      selectedSeats: s.selectedSeats.includes(seat)
        ? s.selectedSeats.filter((se) => se !== seat)
        : [...s.selectedSeats, seat],
    }));
  const resetBooking = () => setState(initial);

  return (
    <BookingContext.Provider
      value={{
        ...state,
        setMovieId,
        setTheatre,
        setDate,
        toggleSeat,
        resetBooking,
        totalPrice: state.selectedSeats.length * seatPrice,
        seatPrice,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
};
