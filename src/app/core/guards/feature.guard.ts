// core/guards/feature.guard.ts
import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export function featureGuard(feature: string): CanActivateFn {
  return () => {
    const features = JSON.parse(localStorage.getItem('features') || '[]');
    return features.includes(feature);
  };
}
