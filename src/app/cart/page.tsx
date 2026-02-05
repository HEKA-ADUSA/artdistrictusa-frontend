"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function CartPage() {
    // Placeholder cart items
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            title: "Abstract Horizon",
            artist: "Jane Smith",
            price: 850,
            quantity: 1,
            image: "/placeholder-art.jpg"
        }
    ]);

    const updateQuantity = (id: number, delta: number) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const removeItem = (id: number) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = cartItems.length > 0 ? 25 : 0;
    const total = subtotal + shipping;

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="flex items-center gap-3 mb-8">
                <ShoppingCart className="h-8 w-8" />
                <h1 className="text-4xl font-bold">Your Cart</h1>
            </div>

            {cartItems.length === 0 ? (
                <div className="text-center py-1

2">
                    <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                    <p className="text-gray-600 mb-6">Start adding some amazing artwork!</p>
                    <Link href="/artworks">
                        <Button size="lg">Browse Artwork</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="md:col-span-2 space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex gap-4 border rounded-lg p-4">
                                <div className="w-32 h-32 bg-gray-100 rounded flex-shrink-0">
                                    {/* Placeholder for artwork image */}
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        Image
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">{item.title}</h3>
                                    <p className="text-gray-600">by {item.artist}</p>
                                    <p className="text-primary font-bold mt-2">${item.price.toLocaleString()}</p>

                                    <div className="flex items-center gap-4 mt-4">
                                        <div className="flex items-center gap-2 border rounded">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => updateQuantity(item.id, -1)}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span className="w-8 text-center">{item.quantity}</span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => updateQuantity(item.id, 1)}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="md:col-span-1">
                        <div className="border rounded-lg p-6 sticky top-4">
                            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>${shipping}</span>
                                </div>
                                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>${total.toLocaleString()}</span>
                                </div>
                            </div>
                            <Button className="w-full" size="lg">
                                Proceed to Checkout
                            </Button>
                            <Link href="/artworks">
                                <Button variant="outline" className="w-full mt-2">
                                    Continue Shopping
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
